import React, { useRef, useEffect } from "react";

const AnimeCursor: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouse = useRef({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl =
      canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    if (!gl || !(gl instanceof WebGLRenderingContext)) {
      console.error("WebGL not supported");
      return;
    }

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Vertex Shader
    const vertexShaderSource = `
      precision mediump float;
      attribute vec2 aPosition;
      uniform vec2 uMouse;
      uniform vec2 uResolution;
      uniform float uTime;

      varying float vAlpha;

      void main() {
        vec2 pos = aPosition;

        // Add a gentle wind force (constant direction)
        vec2 wind = vec2(0.0005, 0.0001);
        pos += wind * uTime;

        // Optional: Add cursor gusts
        vec2 mouseNorm = uMouse * 2.0 - 1.0;
        float dist = distance(pos, mouseNorm);
        float force = 0.005 / (dist + 0.1);
        pos += normalize(pos - mouseNorm) * force;

        gl_Position = vec4(pos, 0.0, 1.0);
        gl_PointSize = 1.2;

        // fade out particles further from mouse
        vAlpha = 1.0 - smoothstep(0.0, 1.2, dist);
      }
    `;

    // Fragment Shader
    const fragmentShaderSource = `
      precision mediump float;
      varying float vAlpha;

      void main() {
        gl_FragColor = vec4(0.8, 0.7, 0.3, vAlpha * 0.8); // golden wind particles
      }
    `;

    const createShader = (type: number, source: string) => {
      const shader = gl.createShader(type)!;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error("Shader compile error:", gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vertexShader = createShader(gl.VERTEX_SHADER, vertexShaderSource)!;
    const fragmentShader = createShader(
      gl.FRAGMENT_SHADER,
      fragmentShaderSource
    )!;

    const program = gl.createProgram()!;
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error("Program link error:", gl.getProgramInfoLog(program));
      return;
    }

    gl.useProgram(program);

    const numDots = 30000;
    const positions = new Float32Array(numDots * 2);
    for (let i = 0; i < numDots * 2; i += 2) {
      positions[i] = Math.random() * 2 - 1;
      positions[i + 1] = Math.random() * 2 - 1;
    }

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

    const aPosition = gl.getAttribLocation(program, "aPosition");
    gl.enableVertexAttribArray(aPosition);
    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);

    const uMouse = gl.getUniformLocation(program, "uMouse");
    const uResolution = gl.getUniformLocation(program, "uResolution");
    const uTime = gl.getUniformLocation(program, "uTime");

    const handleMouse = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = 1 - (e.clientY - rect.top) / rect.height;
      mouse.current = { x, y };
    };
    window.addEventListener("mousemove", handleMouse);

    let startTime = performance.now();

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    const render = () => {
      const elapsed = (performance.now() - startTime) * 0.001;

      // Instead of clearing fully, draw semi-transparent black rectangle to fade trail
      gl.enable(gl.SCISSOR_TEST);
      gl.scissor(0, 0, canvas.width, canvas.height);
      gl.clearColor(0.0, 0.0, 0.0, 0.05); // Low alpha to keep trail for a few seconds
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.disable(gl.SCISSOR_TEST);

      gl.uniform2f(uMouse, mouse.current.x, mouse.current.y);
      gl.uniform2f(uResolution, canvas.width, canvas.height);
      gl.uniform1f(uTime, elapsed);

      gl.drawArrays(gl.POINTS, 0, numDots);
      requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouse);
    };
  }, []);

  return (
    <div className="fixed AnimeCursor inset-0 z-50 pointer-events-none">
      <canvas ref={canvasRef} className="w-100 h-100 block" />
    </div>
  );
};

export default AnimeCursor;
