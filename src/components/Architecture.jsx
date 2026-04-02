import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import './Architecture.css';

export default function Architecture() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const cont = containerRef.current;
    const canvas = canvasRef.current;
    if (!cont || !canvas) return;

    // Load local, CORS-safe SVGs downloaded via node
    const ICONS = {
      github: '/logos/github.svg',
      actions: '/logos/actions.svg',
      terraform: '/logos/terraform.svg',
      cloudfront: '/logos/cloudfront.svg',
      build: '/logos/build.svg',
      ecr: '/logos/ecr.svg',
      ssm: '/logos/ssm.svg',
      cloudwatch: '/logos/cloudwatch.svg',
      s3: '/logos/s3.svg',
      alb: '/logos/alb.svg',
      acm: '/logos/acm.svg',
      fargate: '/logos/fargate.svg',
      redis: '/logos/redis.svg',
      grafana: '/logos/grafana.svg',
      ecs: '/logos/ecs.svg',
      aurora: '/logos/aurora.svg',
      ses: '/logos/ses.svg',
      user: '/logos/user.svg',
      dns: '/logos/dns.svg'
    };

    const imgs = {};
    function preload(cb) {
      const keys = Object.keys(ICONS);
      const n = keys.length;
      let done = 0;
      function tick() {
        if (++done >= n) cb();
      }
      keys.forEach((k) => {
        const img = new Image();
        // Since we fetch locally from the Vite dev server, crossOrigin works naturally.
        img.onload = () => { imgs[k] = img; tick(); };
        img.onerror = () => { imgs[k] = null; tick(); };
        img.src = ICONS[k];
      });
    }

    function init() {
      const scene = new THREE.Scene();
      scene.background = new THREE.Color(0x080f1e);
      scene.fog = new THREE.Fog(0x080f1e, 60, 120);

      let W = cont.clientWidth || 900;
      let H = cont.clientHeight || 700;
      let cs = 24;
      const asp = W / H;
      const camera = new THREE.OrthographicCamera(-cs * asp, cs * asp, cs, -cs, -200, 500);
      camera.position.set(30, 28, 30);
      camera.lookAt(0, 1, 0);

      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false });
      renderer.setSize(W, H);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      scene.add(new THREE.AmbientLight(0x334466, 1.2));
      const sun = new THREE.DirectionalLight(0xffffff, 1.4);
      sun.position.set(20, 30, 15);
      scene.add(sun);

      const grid = new THREE.GridHelper(90, 45, 0x112244, 0x0a1528);
      grid.position.y = -0.5;
      scene.add(grid);

      function makeIconTex(key) {
        const sz = 256;
        const cv = document.createElement('canvas');
        cv.width = cv.height = sz;
        const ctx = cv.getContext('2d');
        ctx.clearRect(0, 0, sz, sz);
        const img = imgs[key];
        if (img) {
          try {
            ctx.drawImage(img, 0, 0, sz, sz);
          } catch (e) {}
        }
        return new THREE.CanvasTexture(cv);
      }

      function makeLabel(text, col) {
        const cv = document.createElement('canvas');
        cv.width = 320;
        cv.height = 64;
        const ctx = cv.getContext('2d');
        ctx.font = 'bold 20px monospace';
        ctx.fillStyle = col || 'rgba(200,220,255,0.9)';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        const lines = text.split('\n');
        const lh = 24;
        const startY = 32 - ((lines.length - 1) * lh) / 2;
        lines.forEach((l, i) => {
          ctx.fillText(l, 160, startY + i * lh);
        });
        const tex = new THREE.CanvasTexture(cv);
        const mat = new THREE.SpriteMaterial({ map: tex, transparent: true, depthTest: false, depthWrite: false });
        const sp = new THREE.Sprite(mat);
        sp.scale.set(320 / 55, 64 / 55, 1);
        return sp;
      }

      function spr(text, fs, col) {
        const cv = document.createElement('canvas');
        cv.width = 300;
        const ctx = cv.getContext('2d');
        const fnt = `bold ${fs}px monospace`;
        ctx.font = fnt;
        const parts = text.split('\n');
        const lines = [];
        parts.forEach((p) => {
          const ws = p.split(' ');
          let cur = '';
          ws.forEach((w) => {
            const t = cur ? cur + ' ' + w : w;
            if (ctx.measureText(t).width > 280 && cur) {
              lines.push(cur);
              cur = w;
            } else cur = t;
          });
          if (cur) lines.push(cur);
        });
        const lh = fs * 1.3;
        cv.height = Math.max(lines.length * lh + 8, 20);
        const c2 = cv.getContext('2d');
        c2.font = fnt;
        c2.fillStyle = col || '#fff';
        c2.textAlign = 'center';
        c2.textBaseline = 'top';
        lines.forEach((l, i) => {
          c2.fillText(l, 150, 4 + i * lh);
        });
        const tex = new THREE.CanvasTexture(cv);
        const mat = new THREE.SpriteMaterial({ map: tex, transparent: true, depthTest: false, depthWrite: false });
        const sp = new THREE.Sprite(mat);
        sp.scale.set(300 / 46, cv.height / 46, 1);
        return sp;
      }

      function bnd(label, x, y, z, w, h, d, color, lc) {
        const g = new THREE.Group();
        const geo = new THREE.BoxGeometry(w, h, d);
        const wm = new THREE.MeshBasicMaterial({ color: color, wireframe: true, transparent: true, opacity: 0.28 });
        g.add(new THREE.Mesh(geo, wm));
        const fm = new THREE.MeshBasicMaterial({ color: color, transparent: true, opacity: 0.03, side: THREE.BackSide });
        g.add(new THREE.Mesh(geo.clone(), fm));
        const sp = spr(label, 15, lc || '#fff');
        sp.position.set(0, h / 2 + 0.5, 0);
        g.add(sp);
        g.position.set(x, y, z);
        return g;
      }

      const allSprites = [];
      function nd(x, y, z, label, iconKey, scale = 1.8) {
        const g = new THREE.Group();
        const tex = makeIconTex(iconKey);
        const mat = new THREE.SpriteMaterial({ map: tex, transparent: true, depthWrite: false });
        const sp = new THREE.Sprite(mat);
        sp.scale.set(scale, scale, 1);
        g.add(sp);
        allSprites.push({ mat, baseY: y, t: Math.random() * Math.PI * 2 });

        const lb = makeLabel(label);
        lb.position.y = -scale / 2 - 0.55;
        g.add(lb);

        g.position.set(x, y, z);
        scene.add(g);
        return g;
      }

      const flows = [];
      function conn(x1, y1, z1, x2, y2, z2, color, anim) {
        const s = new THREE.Vector3(x1, y1, z1);
        const e = new THREE.Vector3(x2, y2, z2);
        const m = s.clone().add(e).multiplyScalar(0.5);
        m.y += Math.min(s.distanceTo(e) * 0.15, 3.0);
        const curve = new THREE.QuadraticBezierCurve3(s, m, e);
        const pts = curve.getPoints(32);
        scene.add(new THREE.Line(
          new THREE.BufferGeometry().setFromPoints(pts),
          new THREE.LineBasicMaterial({ color: color, transparent: true, opacity: 0.45 })
        ));
        const dir = new THREE.Vector3().subVectors(pts[pts.length - 1], pts[pts.length - 3]).normalize();
        const am = new THREE.Mesh(new THREE.ConeGeometry(0.12, 0.35, 5), new THREE.MeshBasicMaterial({ color: color }));
        am.position.copy(e);
        am.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir);
        scene.add(am);
        if (anim) {
          const ps = [0, 0.34, 0.67].map(() => {
            const pm = new THREE.Mesh(new THREE.SphereGeometry(0.13, 6, 6), new THREE.MeshBasicMaterial({ color: color }));
            scene.add(pm);
            return pm;
          });
          flows.push({ curve, ps, offs: [0, 0.34, 0.67] });
        }
      }

      scene.add(bnd('GitHub Ecosystem', -20, .5, 0, 7.5, 3.5, 7, 0x4078c8, '#7aacff'));
      scene.add(bnd('AWS Cloud ap-south-1', 1.5, 1, 0, 25, 5.5, 15, 0xFF9900, '#FF9900'));
      scene.add(bnd('VPC  10.0.0.0/16', 2, .5, 0, 17, 3.5, 11, 0x00bfff, '#00bfff'));
      scene.add(bnd('ECS Fargate Cluster', 6.5, .5, -.5, 9.5, 3.5, 9.5, 0xFF6600, '#FF9900'));

      const psl = spr('Public Subnets', 13, '#88ccff');
      psl.position.set(-4.5, 2.8, 4);
      scene.add(psl);

      nd(-21, 0, 2, 'App Repo\n(Node.js)', 'github', 1.7);
      nd(-21, 0, -2, 'Frontend Repo\n(React/Vue)', 'github', 1.7);
      nd(-17.5, 0, 0, 'GitHub Actions', 'actions', 1.8);
      nd(-13.5, 1.5, 3, 'Terraform Apply', 'terraform', 1.8);
      nd(-13.5, 0.5, 0, 'CloudFront CDN', 'cloudfront', 1.8);
      nd(-13.5, 0.5, -2.5, 'Build & Sync', 'build', 1.6);
      nd(-11, 0, -4.5, 'ECR', 'ecr', 1.8);
      nd(-3, 3.5, 6, 'SSM Parameter Store', 'ssm', 1.8);
      nd(3.5, 3.5, 6, 'CloudWatch', 'cloudwatch', 1.8);
      nd(10, 3.5, 6, 'S3 Terraform State', 's3', 1.8);
      nd(-7.5, 0, 0, 'User', 'user', 1.5);
      nd(-5.5, 0, 0, 'GoDaddy DNS', 'dns', 1.6);
      nd(-4, 0, 3.5, 'S3 Frontend', 's3', 1.8);
      nd(-2, 0, 0, 'ALB :443', 'alb', 1.9);
      nd(-2, 0, -2.5, 'ACM Certificate', 'acm', 1.6);
      nd(5, 0, 3, 'Fargate Spot\nAuto-Scaling', 'fargate', 1.9);
      nd(5, 0, 0.5, 'Fargate Normal\nStable', 'fargate', 1.9);
      nd(5, 0, -2, 'ElastiCache Redis', 'redis', 1.9);
      nd(9, 0, -2, 'Grafana', 'grafana', 1.8);
      nd(0, 0, -5.5, 'ECS Service', 'ecs', 1.8);
      nd(15, 0, 3, 'Aurora Serverless v2', 'aurora', 2.0);
      nd(15, 0, -2, 'Amazon SES', 'ses', 1.8);

      conn(-21, 0, 2, -17.5, 0, 0, 0x4488ff, true);
      conn(-21, 0, -2, -17.5, 0, 0, 0x4488ff, true);
      conn(-17.5, 0, 0, -13.5, 1.5, 3, 0xaa44ff, true);
      conn(-17.5, 0, 0, -13.5, 0.5, -2.5, 0x4A90D9, true);
      conn(-13.5, 0.5, -2.5, -11, 0, -4.5, 0x4A90D9);
      conn(-11, 0, -4.5, 0, 0, -5.5, 0xFF9900);
      conn(-13.5, 1.5, 3, -3, 3.5, 6, 0xE7157B);
      conn(-13.5, 1.5, 3, 2, 0.5, 0, 0xaa44ff);
      conn(-13.5, 1.5, 3, -13.5, 0.5, 0, 0xaa44ff);
      conn(-13.5, 1.5, 3, 10, 3.5, 6, 0x569A31);
      conn(-13.5, 0.5, 0, -4, 0, 3.5, 0x569A31);
      conn(-13.5, 0.5, 0, -7.5, 0, 0, 0x22ccaa);
      conn(-7.5, 0, 0, -5.5, 0, 0, 0x8899aa);
      conn(-5.5, 0, 0, -13.5, 0.5, 0, 0x00ccff);
      conn(-5.5, 0, 0, -2, 0, 0, 0xFF9900, true);
      conn(-3, 3.5, 6, 5, 0, 3, 0xE7157B);
      conn(-2, 0, 0, 5, 0, 3, 0xFF9900, true);
      conn(-2, 0, 0, 5, 0, 0.5, 0xFF9900, true);
      conn(5, 0, 3, 15, 0, 3, 0x6688ff, true);
      conn(5, 0, 0.5, 15, 0, 3, 0x6688ff);
      conn(5, 0, 0.5, 15, 0, -2, 0xDD344C);
      conn(9, 0, -2, 5, 0, 3, 0xF46800);
      conn(0, 0, -5.5, 5, 0, 3, 0xFF6600);
      conn(0, 0, -5.5, 5, 0, 0.5, 0xFF6600);
      conn(5, 0, 3, 3.5, 3.5, 6, 0xE7157B);
      conn(5, 0, 0.5, 3.5, 3.5, 6, 0xE7157B);

      let theta = Math.PI / 4, phi = 0.52, isDrag = false, prevX = 0, prevY = 0, autoRot = true, R = 65;
      function upCam() {
        camera.position.x = R * Math.sin(theta) * Math.cos(phi);
        camera.position.y = R * Math.sin(phi);
        camera.position.z = R * Math.cos(theta) * Math.cos(phi);
        camera.lookAt(0, 1, 0);
      }
      upCam();

      const handleMouseDown = (e) => { isDrag = true; autoRot = false; prevX = e.clientX; prevY = e.clientY; };
      const handleMouseMove = (e) => {
        if (!isDrag) return;
        theta -= (e.clientX - prevX) * 0.008;
        phi = Math.max(0.1, Math.min(1.15, phi - (e.clientY - prevY) * 0.008));
        upCam(); prevX = e.clientX; prevY = e.clientY;
      };
      const handleMouseUp = () => { isDrag = false; };
      const handleWheel = (e) => {
        e.preventDefault();
        cs *= e.deltaY > 0 ? 1.1 : 0.9; cs = Math.max(8, Math.min(60, cs));
        const a = cont.clientWidth / cont.clientHeight;
        camera.left = -cs * a; camera.right = cs * a; camera.top = cs; camera.bottom = -cs;
        camera.updateProjectionMatrix();
      };
      
      canvas.addEventListener('mousedown', handleMouseDown);
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      canvas.addEventListener('wheel', handleWheel, { passive: false });

      let t = 0;
      let animId;
      function anim() {
        animId = requestAnimationFrame(anim);
        t += 0.01;
        if (autoRot) { theta += 0.0025; upCam(); }
        allSprites.forEach((s) => {
          s.mat.opacity = 0.82 + 0.18 * Math.sin(t * 0.8 + s.t);
        });
        flows.forEach((f) => {
          f.ps.forEach((p, i) => {
            f.offs[i] = (f.offs[i] + 0.004) % 1;
            p.position.copy(f.curve.getPoint(f.offs[i]));
          });
        });
        renderer.render(scene, camera);
      }
      anim();

      const handleResize = () => {
        const nW = cont.clientWidth;
        const nH = cont.clientHeight;
        const a = nW / nH;
        camera.left = -cs * a; camera.right = cs * a; camera.top = cs; camera.bottom = -cs;
        camera.updateProjectionMatrix();
        renderer.setSize(nW, nH);
      };
      window.addEventListener('resize', handleResize);

      return () => {
        cancelAnimationFrame(animId);
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
        canvas.removeEventListener('mousedown', handleMouseDown);
        canvas.removeEventListener('wheel', handleWheel);
        renderer.dispose();
      };
    }

    preload(init);

  }, []);

  return (
    <section id="architecture" data-section="architecture" className="architecture-section section">
      <div className="container architecture__container">
        <div id="idc" ref={containerRef}>
          <canvas id="ic" ref={canvasRef}></canvas>
          <div className="iov" id="itl">MEDZEN INNOVATIONS — AWS CLOUD INFRASTRUCTURE</div>
          <div className="iov" id="isu">ECS FARGATE · AURORA SERVERLESS · ELASTICACHE REDIS · TERRAFORM · ap-south-1</div>
          <div className="iov" id="ihn">DRAG TO ROTATE · SCROLL TO ZOOM · AUTO-ROTATING</div>
          
          <div className="iov" id="ilg">
            <div className="ile"><div className="ild" style={{ background: '#4078c8' }}></div>GitHub</div>
            <div className="ile"><div className="ild" style={{ background: '#7B42BC' }}></div>CI/CD · Terraform · CDN</div>
            <div className="ile"><div className="ild" style={{ background: '#FF9900' }}></div>AWS Compute · ALB</div>
            <div className="ile"><div className="ild" style={{ background: '#569A31' }}></div>Storage (S3)</div>
            <div className="ile"><div className="ild" style={{ background: '#E7157B' }}></div>Monitoring · Secrets</div>
            <div className="ile"><div className="ild" style={{ background: '#DC382D' }}></div>Redis Cache</div>
            <div className="ile"><div className="ild" style={{ background: '#F46800' }}></div>Grafana</div>
            <div className="ile"><div className="ild" style={{ background: '#3B48CC' }}></div>Aurora · SES</div>
          </div>
        </div>
      </div>
    </section>
  );
}
