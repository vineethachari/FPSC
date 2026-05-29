import { useCallback, useEffect, useRef, useState } from 'react';
import Lenis from 'lenis';
import './styles.css';

/* ============================================================
   DATA
   ============================================================ */

type WorkPanel = {
  num: string;
  tag: string;
  client: string;
  title: string;
  image: string;
  video:
    | { type: 'vimeo'; id: string }
    | { type: 'youtube'; id: string }
    | { type: 'mp4'; url: string };
};

const WORK_PANELS: WorkPanel[] = [
  {
    num: '01',
    tag: 'BRAND FILM · 2024',
    client: 'KALYAN\nSILKS',
    title: 'Fazyo',
    image:
      '/firstpictureshowcompany/uploads/work1.webp',
    video: { type: 'vimeo', id: '1107472292' },
  },
  {
    num: '02',
    tag: 'COMMERCIAL · 2024',
    client: "VESTA\nICE CREAMS",
    title: 'Vesta Ice Crush',
    image:
      '/firstpictureshowcompany/uploads/vesta.webp',
    video: { type: 'vimeo', id: '1107472212' },
  },
  {
    num: '03',
    tag: 'BRAND FILM · 2023',
    client: 'KANCHANA\nFOOD PRODUCTS',
    title: "Kanchana Sambar Master Film",
    image:
      '/firstpictureshowcompany/uploads/work3.webp',
    video: { type: 'vimeo', id: '1107472644' },
  },
];

const BTS_IMAGES = [
  '/firstpictureshowcompany/uploads/471163289.jpg',
  '/firstpictureshowcompany/uploads/480953620.jpg',
  '/firstpictureshowcompany/uploads/481995696.jpg',
  '/firstpictureshowcompany/uploads/481074380.jpg',
];

const CLIENTS = [
  'AVT',
  "MANAPPURAM FINANCE LTD",
  'KERALA VISION BROADBAND',
  'Kerala Blasters',
  'Southern Hills',
  'Vesta Ice creams',
  'Entri App',
  'BS Channabasappa &Sons',
  'SUNNY DIAMONDS',
  'Dawn Aesthetics',
];

const SHOWREEL_MP4 =
  'https://player.vimeo.com/progressive_redirect/playback/1118837524/rendition/1080p/file.mp4?loc=external&log_user=0&signature=572f0049b913b578c83140e9e68ab80e2042aeabe1f682152c0d336a018fe412';

/* ============================================================
   VIDEO URL HELPERS
   ============================================================ */

type ModalSource =
  | { type: 'vimeo'; id: string }
  | { type: 'youtube'; id: string }
  | { type: 'mp4'; url: string };

type CollageItem = {
  id: string;
  title: string;
  client: string;
  tag: string;
  ratio: string;
  video: ModalSource;
  image: string;
};

/* Exact 24 Movie Posters matching the User's Attached UI layout (Row by Row, Left to Right) */
const COLLAGE_ITEMS: CollageItem[] = [
  // ROW 1
  {
    id: 'top-gun-maverick',
    title: 'AVT Onam',
    client: 'AVT',
    tag: 'ACTION · DRAMA',
    ratio: '2/3',
    video: { type: 'youtube', id: 'f6fw-E6antE' },
    image: 'https://firstpictureshowcompany.com/en/wp-content/uploads/2024/11/1.18.1_1.18.1-scaled.jpg'
  },
  {
    id: 'all-quiet',
    title: 'Yeahhhhh..... Hooooooo Diwali',
    client: 'MANAPPURAM FINANCE',
    tag: 'WAR · ACTION',
    ratio: '2/3',
    video: { type: 'youtube', id: '_KBqYgNyusU' },
    image: '/firstpictureshowcompany/uploads/Yeahhhhh..... Hooooooo.png'
  },
  {
    id: 'avatar-way-of-water',
    title: 'Brand Film',
    client: 'KERALA VISION BROADBAND',
    tag: 'SCI-FI · ADVENTURE',
    ratio: '2/3',
    video: { type: 'youtube', id: 'FpY9NjLKVXU' },
    image: 'https://firstpictureshowcompany.com/en/wp-content/uploads/2024/05/IMG_5971-scaled.jpg'
  },
  {
    id: 'elvis',
    title: 'Suguna Delfrez in association with Kerala Blasters',
    client: 'SUGUNA DELFREZ',
    tag: 'BIOGRAPHY · MUSIC',
    ratio: '2/3',
    video: { type: 'youtube', id: 'ZbrmBotVIGw' },
    image: 'https://firstpictureshowcompany.com/en/wp-content/uploads/2024/05/IMG_9022.jpeg.jpg'
  },
  {
    id: 'women-talking',
    title: 'Eatapioca Bride Film',
    client: 'SOUTHERN HILLS',
    tag: 'DRAMA',
    ratio: '2/3',
    video: { type: 'youtube', id: 'o71MjLjdLec' },
    image: 'https://firstpictureshowcompany.com/en/wp-content/uploads/2023/11/1_1.14.1.jpeg'
  },
  {
    id: 'the-fabelmans',
    title: 'Eatapioca Youngster Film',
    client: 'SOUTHERN HILLS',
    tag: 'DRAMA · FAMILY',
    ratio: '2/3',
    video: { type: 'youtube', id: 'pC7L6OW3PvU' },
    image: '/firstpictureshowcompany/uploads/1_1.40.1.webp'
  },
  {
    id: 'banshees-of-inisherin',
    title: 'Vesta Ice Crush',
    client: 'VESTA ICE CREAMS',
    tag: 'DARK COMEDY · DRAMA',
    ratio: '2/3',
    video: { type: 'youtube', id: 'ClAvTLqfcII' },
    image: 'https://firstpictureshowcompany.com/en/wp-content/uploads/2023/11/IMG_2376.jpeg'
  },
  {
    id: 'eeaaow',
    title: 'Vesta Ice Creams',
    client: 'VESTA ICE CREAMS',
    tag: 'SCI-FI · ACTION · COMEDY',
    ratio: '2/3',
    video: { type: 'youtube', id: '_jFSPf5r8S4' },
    image: 'https://firstpictureshowcompany.com/en/wp-content/uploads/2024/05/IMG_9024.jpeg.jpg'
  },
  // ROW 2
  {
    id: 'tar',
    title: 'Vesta Ice Creams',
    client: 'VESTA ICE CREAMS',
    tag: 'DRAMA · MUSIC',
    ratio: '2/3',
    video: { type: 'youtube', id: 'gUtb7d7xGqI' },
    image: 'https://firstpictureshowcompany.com/en/wp-content/uploads/2024/05/IMG_2383.jpeg.jpg'
  },
  {
    id: 'triangle-of-sadness',
    title: 'BSC Textile Mall',
    client: 'BS CHANNABASAPPA &SONS',
    tag: 'SATIRE · COMEDY',
    ratio: '2/3',
    video: { type: 'youtube', id: 'p9r6QfMT58k' },
    image: 'https://firstpictureshowcompany.com/en/wp-content/uploads/2024/05/IMG_9026.jpeg.jpg'
  },
  {
    id: 'oppenheimer',
    title: 'Brilliance in Every Bloom',
    client: 'SUNNY DIAMONDS',
    tag: 'BIOGRAPHY · DRAMA · HISTORY',
    ratio: '2/3',
    video: { type: 'youtube', id: '-Q4DHdtBJso' },
    image: 'https://i.ytimg.com/vi/-Q4DHdtBJso/mqdefault.jpg'
  },
  {
    id: 'barbie',
    title: 'Dawn Aesthetics',
    client: 'DAWN AESTHETICS',
    tag: 'COMEDY · FANTASY',
    ratio: '2/3',
    video: { type: 'youtube', id: '8Zu0YJNnXW0' },
    image: 'https://firstpictureshowcompany.com/en/wp-content/uploads/2024/05/IMG_9029.jpeg.jpg'
  }
];

function buildModalEmbedSrc(source: ModalSource): string | null {
  if (source.type === 'vimeo') {
    const params = new URLSearchParams({
      autoplay: '1',
      color: 'ffffff',
      title: '0',
      byline: '0',
      portrait: '0',
    });
    return `https://player.vimeo.com/video/${source.id}?${params.toString()}`;
  }
  if (source.type === 'youtube') {
    const params = new URLSearchParams({
      autoplay: '1',
      rel: '0',
      modestbranding: '1',
      iv_load_policy: '3',
      playsinline: '1',
    });
    return `https://www.youtube-nocookie.com/embed/${source.id}?${params.toString()}`;
  }
  return null; // mp4 → use <video>
}

function parseVideoUrl(raw: string): ModalSource | null {
  const url = raw.trim();
  if (!url) return null;
  const yt = url.match(
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/|youtube\.com\/shorts\/|youtube\.com\/v\/)([a-zA-Z0-9_-]{11})/
  );
  if (yt) return { type: 'youtube', id: yt[1] };
  const vm = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  if (vm) return { type: 'vimeo', id: vm[1] };
  return null;
}

/* ============================================================
   APP
   ============================================================ */

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showreelPlaying, setShowreelPlaying] = useState(false);

  const [modal, setModal] = useState<{
    open: boolean;
    source: ModalSource | null;
    title: string;
    tag: string;
    key: number;
  }>({ open: false, source: null, title: '', tag: '', key: 0 });
  const [urlInput, setUrlInput] = useState('');

  // refs
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);
  const heroVideoWrapRef = useRef<HTMLDivElement>(null);
  const heroSectionRef = useRef<HTMLElement>(null);
  const showreelVideoRef = useRef<HTMLVideoElement | null>(null);
  const footerRef = useRef<HTMLElement>(null);

  /* --------------------
     Smooth Scrolling with Lenis
     -------------------- */
  useEffect(() => {
    const lenis = new Lenis();

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  /* --------------------
     Custom cursor
     -------------------- */
  useEffect(() => {
    const dot = cursorDotRef.current;
    const ring = cursorRingRef.current;
    if (!dot || !ring) return;

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%,-50%)`;
    };

    let raf = 0;
    const loop = () => {
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%,-50%)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const over = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('a, button, .work-panel-cta, .movie-poster-card, .showreel-play')) {
        document.body.classList.add('cursor-hover');
      }
    };
    const out = () => document.body.classList.remove('cursor-hover');

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseover', over);
    document.addEventListener('mouseout', out);
    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', over);
      document.removeEventListener('mouseout', out);
    };
  }, []);

  /* --------------------
     Footer height sync
     -------------------- */


  /* --------------------
     Scroll reveal
     -------------------- */
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add('in');
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  /* --------------------
     Scroll-based hero zoom + advanced column parallax
     -------------------- */
  useEffect(() => {
    const parallaxImgs = () =>
      Array.from(
        document.querySelectorAll<HTMLElement>('.services-img, .about-img')
      );

    const onScroll = () => {
      const sy = window.scrollY;
      const hero = heroSectionRef.current;
      const wrap = heroVideoWrapRef.current;
      
      // 1. Hero scale-up and clip-path inset scroll parallax
      if (hero && wrap) {
        const heroH = hero.offsetHeight;
        const p = Math.min(sy / heroH, 1);
        const scale = 1 + p * 0.12;
        const insetPct = p * 5;
        wrap.style.transform = `scale(${scale})`;
        hero.style.clipPath = `inset(${insetPct}% 0%)`;
      }

      // 2. Interactive Column-shifting Parallax (Asynchronous Columns Scroll)
      const cards = document.querySelectorAll<HTMLElement>('.movie-poster-card');
      cards.forEach((card, idx) => {
        const col = idx % 8;
        const speed = (col % 2 === 0) ? 0.08 : -0.08;
        card.style.transform = `translateY(${sy * speed}px)`;
      });

      // 3. Section image parallax scroll
      parallaxImgs().forEach((img) => {
        const section = img.closest('section');
        const rect = (section ?? img).getBoundingClientRect();
        const vH = window.innerHeight;
        const pr = Math.max(0, Math.min(1, (vH - rect.top) / (vH + rect.height)));
        const imgScale = 1 + pr * 0.06;
        const translateY = (pr - 0.5) * -30;
        img.style.transform = `scale(${imgScale}) translateY(${translateY}px)`;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* --------------------
     Smooth anchor scroll
     -------------------- */
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest('a[href^="#"]');
      if (!a) return;
      const href = a.getAttribute('href');
      if (!href || href === '#') return;
      const el = document.querySelector(href);
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: 'smooth' });
      }
    };
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, []);

  /* --------------------
     Modal open/close
     -------------------- */
  const openModal = useCallback(
    (source: ModalSource, title: string, tag: string) => {
      setUrlInput('');
      setModal({ open: true, source, title, tag, key: Date.now() });
      document.body.style.overflow = 'hidden';
    },
    []
  );

  const closeModal = useCallback(() => {
    setModal((m) => ({ ...m, open: false, source: null }));
    document.body.style.overflow = '';
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && modal.open) closeModal();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [modal.open, closeModal]);

  const loadFromUrl = useCallback(() => {
    const parsed = parseVideoUrl(urlInput);
    if (!parsed) {
      // eslint-disable-next-line no-alert
      alert('Could not detect a YouTube or Vimeo URL. Please paste a valid link.');
      return;
    }
    setModal((m) => ({
      ...m,
      source: parsed,
      title: parsed.type === 'youtube' ? 'YouTube Video' : 'Vimeo Video',
      tag: parsed.type.toUpperCase(),
      key: Date.now(),
    }));
  }, [urlInput]);

  /* --------------------
     Showreel in-place play (original behavior)
     -------------------- */
  const playShowreel = useCallback(() => {
    if (showreelPlaying) return;
    const v = showreelVideoRef.current;
    if (!v) return;
    v.src = SHOWREEL_MP4;
    v.load();
    v.play().catch(() => {});
    setShowreelPlaying(true);
  }, [showreelPlaying]);

  /* ============================================================
     RENDER
     ============================================================ */
  return (
    <>
      {/* Cursor */}
      <div ref={cursorDotRef} className="cursor-dot" />
      <div ref={cursorRingRef} className="cursor-ring" />

      {/* Video Lightbox Modal */}
      <div
        className={`video-modal ${modal.open ? 'open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Video player"
        onClick={(e) => {
          if (e.target === e.currentTarget) closeModal();
        }}
      >
        <button
          className="modal-close"
          onClick={closeModal}
          aria-label="Close video"
        >
          CLOSE <span className="modal-close-x">✕</span>
        </button>
        <div className="modal-body">
          <div className="modal-video-wrap">
            {modal.open && modal.source && (
              <>
                {modal.source.type === 'mp4' ? (
                  <video
                    key={modal.key}
                    src={modal.source.url}
                    autoPlay
                    controls
                    playsInline
                    style={{ background: '#000' }}
                  />
                ) : (
                  <iframe
                    key={modal.key}
                    src={buildModalEmbedSrc(modal.source) ?? undefined}
                    title={modal.title}
                    allow="autoplay; fullscreen; picture-in-picture; encrypted-media; clipboard-write"
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                )}
              </>
            )}
          </div>
          <div className="modal-meta">
            <div className="modal-title">{modal.title}</div>
            <div className="modal-tag">{modal.tag}</div>
          </div>
          <div className="modal-source-row">
            <span className="modal-source-label">YouTube / Vimeo URL</span>
            <input
              className="modal-source-input"
              type="text"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') loadFromUrl();
              }}
              placeholder="Paste a YouTube or Vimeo link to override…"
            />
            <button className="modal-source-btn" onClick={loadFromUrl}>
              LOAD
            </button>
          </div>
        </div>
        <div className="modal-hint">Press ESC to close</div>
      </div>

      {/* Fullscreen Menu */}
      <div className={`fullmenu ${menuOpen ? 'open' : ''}`}>
        <div className="menu-top">
          <div className="menu-logo">
<svg width="46" height="60" viewBox="0 0 46 60" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12.6992 12.1558H9.98717V0H14.581V0.952185H12.6992V7.84625H14.3043V8.80462H12.6992V12.1558Z" fill="#FCCB3D"/>
<path d="M18.0679 0H15.3559V12.1558H18.0679V0Z" fill="#FCCB3D"/>
<path d="M22.1636 12.1558H19.4516V0H24.6358L24.0516 7.64221H23.3444L24.5866 12.1558H23.4981L22.1636 7.5V12.1558ZM22.1636 0.952185V6.68384H23.0123L23.4612 0.952185H22.1636Z" fill="#FCCB3D"/>
<path d="M30.1767 12.1558H25.3061V11.1974H27.4647V5.46579H25.3061V0H30.1767V0.952185H28.0182V4.5136H30.1767V12.1558Z" fill="#FCCB3D"/>
<path d="M31.9909 0.952185H30.6933V0H36.0128V0.952185H34.7029V12.1558H31.9909V0.952185Z" fill="#FCCB3D"/>
<path d="M6.08209 28.1018H3.37005V15.946H8.72647L7.70561 24.7506H6.08209V28.1018ZM6.08209 23.7984H6.84465L7.61952 16.9044H6.08209V23.7984Z" fill="#FCCB3D"/>
<path d="M12.2134 15.946H9.50134V28.1018H12.2134V15.946Z" fill="#FCCB3D"/>
<path d="M18.1909 28.1018H13.5971V15.946H18.1909V16.8982H16.3091V27.1496H18.1909V28.1018Z" fill="#FCCB3D"/>
<path d="M20.1404 16.8982H18.8428V15.946H24.1684V16.8982H22.8524V28.1018H20.1404V16.8982Z" fill="#FCCB3D"/>
<path d="M24.9433 28.1018V15.9646H25.9826V27.1496H27.5877V15.9646H30.2997V28.1018H24.9433Z" fill="#FCCB3D"/>
<path d="M31.665 28.1018V15.946H36.8492L36.265 23.5882H35.5578L36.8 28.1018H35.7115L34.3832 23.446V28.1018H31.665ZM34.377 16.8982V22.6298H35.2257L35.6746 16.8982H34.377Z" fill="#FCCB3D"/>
<path d="M37.7778 28.1018V15.946H42.3717V16.8982H40.4898V24.7506H42.0765V25.709H40.4898V27.1496H42.3717V28.1018H37.7778Z" fill="#FCCB3D"/>
<path d="M13.6832 44.054H8.80642V43.0956H10.9711V37.364H8.80642V31.892H13.6832V32.8504H11.5184V36.4118H13.6832V44.054Z" fill="#FCCB3D"/>
<path d="M15.8417 44.054H14.8024V31.892H15.8417V40.6966H17.4468V31.892H20.1588V44.054H17.4468V41.655H15.8417V44.054Z" fill="#FCCB3D"/>
<path d="M26.8805 44.054H21.5425V31.892H26.8805V44.054ZM24.1684 32.8504H22.5818V43.0956H24.1684V32.8504Z" fill="#FCCB3D"/>
<path d="M28.8791 44.054L27.6553 31.892H28.6885L29.6786 41.5499L30.6441 31.892H32.3537L33.3193 41.5499L34.2171 31.892H36.9291L35.7914 44.054H32.5628L31.5051 33.6665L30.4535 44.054H28.8791Z" fill="#FCCB3D"/>
<path d="M4.59385 60H0V47.8442H4.59385V48.7964H2.71203V59.0416H4.59385V60Z" fill="#FCCB3D"/>
<path d="M10.7989 60H5.46096V47.8442H10.7989V60ZM8.0869 48.7964H6.50027V59.0416H8.0869V48.7964Z" fill="#FCCB3D"/>
<path d="M13.2158 60H12.1765V47.8442H14.0275L15.0299 57.7061L16.0139 47.8442H19.5377V60H16.8257V50.0453L15.8233 60H14.2182L13.2158 50.033V60Z" fill="#FCCB3D"/>
<path d="M23.6334 60H20.9214V47.8442H26.2778L25.257 56.6488H23.6334V60ZM23.6334 55.6904H24.396L25.1709 48.7964H23.6334V55.6904Z" fill="#FCCB3D"/>
<path d="M27.7906 60H26.7021L27.8275 47.8442H31.2283L32.3537 60H29.6048L29.2912 56.6488H28.0981L27.7906 60ZM28.1904 55.6904H29.2112L28.6947 50.1876L28.1904 55.6904Z" fill="#FCCB3D"/>
<path d="M34.4262 60H33.3869V47.8442H34.5308L36.0313 55.4864V47.8442H38.7433V60H36.0313L34.4262 52.3578V60Z" fill="#FCCB3D"/>
<path d="M40.7297 57.601L39.5243 47.8442H40.5267L41.6275 56.6488H42.1318L43.1527 47.8442H46L44.5856 60H40.8711V59.0416H41.8366L42.0088 57.601H40.7297Z" fill="#FCCB3D"/>
</svg>
</div>
          <button className="menu-close" onClick={() => setMenuOpen(false)}>
            CLOSE ✕
          </button>
        </div>
        <ul className="menu-links">
          {[
            { href: '#hero', label: 'HOME', num: '01' },
            { href: '#work-section', label: 'WORK', num: '02' },
            { href: '#services-section', label: 'SERVICES', num: '03' },
            { href: '#about-section', label: 'ABOUT', num: '04' },
            { href: '#bts-section', label: 'BTS', num: '05' },
            { href: '#clients-section', label: 'CONTACT', num: '06' },
          ].map((item) => (
            <li key={item.num}>
              <a href={item.href} onClick={() => setMenuOpen(false)}>
                <span>{item.label}</span>
                <span className="num">{item.num}</span>
              </a>
            </li>
          ))}
        </ul>
        <div className="menu-bottom">
          <span
            style={{
              fontSize: '0.6rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--text-gray)',
              marginRight: '1rem',
            }}
          >
            SOCIALS:
          </span>
          <a href="#" className="menu-social">INSTAGRAM</a>
          <a href="#" className="menu-social">VIMEO</a>
          <a href="#" className="menu-social">LINKEDIN</a>
          <a href="#" className="menu-social">FACEBOOK</a>
        </div>
      </div>

      {/* ORIGINAL Navigation Header (Logo, LET'S TALK, MENU - Restored) */}
      <nav className="site-nav">
        <a href="#hero" className="nav-logo">
<svg width="46" height="60" viewBox="0 0 46 60" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12.6992 12.1558H9.98717V0H14.581V0.952185H12.6992V7.84625H14.3043V8.80462H12.6992V12.1558Z" fill="#FCCB3D"/>
<path d="M18.0679 0H15.3559V12.1558H18.0679V0Z" fill="#FCCB3D"/>
<path d="M22.1636 12.1558H19.4516V0H24.6358L24.0516 7.64221H23.3444L24.5866 12.1558H23.4981L22.1636 7.5V12.1558ZM22.1636 0.952185V6.68384H23.0123L23.4612 0.952185H22.1636Z" fill="#FCCB3D"/>
<path d="M30.1767 12.1558H25.3061V11.1974H27.4647V5.46579H25.3061V0H30.1767V0.952185H28.0182V4.5136H30.1767V12.1558Z" fill="#FCCB3D"/>
<path d="M31.9909 0.952185H30.6933V0H36.0128V0.952185H34.7029V12.1558H31.9909V0.952185Z" fill="#FCCB3D"/>
<path d="M6.08209 28.1018H3.37005V15.946H8.72647L7.70561 24.7506H6.08209V28.1018ZM6.08209 23.7984H6.84465L7.61952 16.9044H6.08209V23.7984Z" fill="#FCCB3D"/>
<path d="M12.2134 15.946H9.50134V28.1018H12.2134V15.946Z" fill="#FCCB3D"/>
<path d="M18.1909 28.1018H13.5971V15.946H18.1909V16.8982H16.3091V27.1496H18.1909V28.1018Z" fill="#FCCB3D"/>
<path d="M20.1404 16.8982H18.8428V15.946H24.1684V16.8982H22.8524V28.1018H20.1404V16.8982Z" fill="#FCCB3D"/>
<path d="M24.9433 28.1018V15.9646H25.9826V27.1496H27.5877V15.9646H30.2997V28.1018H24.9433Z" fill="#FCCB3D"/>
<path d="M31.665 28.1018V15.946H36.8492L36.265 23.5882H35.5578L36.8 28.1018H35.7115L34.3832 23.446V28.1018H31.665ZM34.377 16.8982V22.6298H35.2257L35.6746 16.8982H34.377Z" fill="#FCCB3D"/>
<path d="M37.7778 28.1018V15.946H42.3717V16.8982H40.4898V24.7506H42.0765V25.709H40.4898V27.1496H42.3717V28.1018H37.7778Z" fill="#FCCB3D"/>
<path d="M13.6832 44.054H8.80642V43.0956H10.9711V37.364H8.80642V31.892H13.6832V32.8504H11.5184V36.4118H13.6832V44.054Z" fill="#FCCB3D"/>
<path d="M15.8417 44.054H14.8024V31.892H15.8417V40.6966H17.4468V31.892H20.1588V44.054H17.4468V41.655H15.8417V44.054Z" fill="#FCCB3D"/>
<path d="M26.8805 44.054H21.5425V31.892H26.8805V44.054ZM24.1684 32.8504H22.5818V43.0956H24.1684V32.8504Z" fill="#FCCB3D"/>
<path d="M28.8791 44.054L27.6553 31.892H28.6885L29.6786 41.5499L30.6441 31.892H32.3537L33.3193 41.5499L34.2171 31.892H36.9291L35.7914 44.054H32.5628L31.5051 33.6665L30.4535 44.054H28.8791Z" fill="#FCCB3D"/>
<path d="M4.59385 60H0V47.8442H4.59385V48.7964H2.71203V59.0416H4.59385V60Z" fill="#FCCB3D"/>
<path d="M10.7989 60H5.46096V47.8442H10.7989V60ZM8.0869 48.7964H6.50027V59.0416H8.0869V48.7964Z" fill="#FCCB3D"/>
<path d="M13.2158 60H12.1765V47.8442H14.0275L15.0299 57.7061L16.0139 47.8442H19.5377V60H16.8257V50.0453L15.8233 60H14.2182L13.2158 50.033V60Z" fill="#FCCB3D"/>
<path d="M23.6334 60H20.9214V47.8442H26.2778L25.257 56.6488H23.6334V60ZM23.6334 55.6904H24.396L25.1709 48.7964H23.6334V55.6904Z" fill="#FCCB3D"/>
<path d="M27.7906 60H26.7021L27.8275 47.8442H31.2283L32.3537 60H29.6048L29.2912 56.6488H28.0981L27.7906 60ZM28.1904 55.6904H29.2112L28.6947 50.1876L28.1904 55.6904Z" fill="#FCCB3D"/>
<path d="M34.4262 60H33.3869V47.8442H34.5308L36.0313 55.4864V47.8442H38.7433V60H36.0313L34.4262 52.3578V60Z" fill="#FCCB3D"/>
<path d="M40.7297 57.601L39.5243 47.8442H40.5267L41.6275 56.6488H42.1318L43.1527 47.8442H46L44.5856 60H40.8711V59.0416H41.8366L42.0088 57.601H40.7297Z" fill="#FCCB3D"/>
</svg>
</a>
        <div className="nav-right">
          <a href="#clients-section" className="nav-talk">LET'S TALK</a>
          <button
            className="nav-menu-btn"
            onClick={() => setMenuOpen(true)}
          >
            MENU
          </button>
        </div>
      </nav>

      {/* Hero Section with Edge-To-Edge Movie Poster Wall Collage */}
      <section id="hero" ref={heroSectionRef}>
        <div className="hero-video-wrap" ref={heroVideoWrapRef}>
          {/* Movie Poster Grid */}
          <div className="hero-movie-grid-container">
            <div className="hero-movie-grid">
              {COLLAGE_ITEMS.map((item, index) => {
                return (
                  <div
                    key={item.id}
                    className="movie-poster-card"
                    onClick={() => openModal(item.video, ` ${item.title}`, item.tag)}
                  >
                    <div className="poster-inner">
                      <img
                        className="poster-img"
                        src={item.image}
                        alt={item.title}
                        loading="eager"
                      />

                      {/* Film highlight sheen */}
                      <div className="poster-overlay-shine" />

                      {/* Technical camera monitor overlay */}
                      <div className="poster-hud">
                        <span>POSTER {String(index + 1).padStart(2, '0')}</span>
                        <span className="poster-hud-rec">● LIVE</span>
                      </div>

                      {/* Hover Info Slate overlay */}
                      <div className="poster-info">
                        <div className="poster-title">{item.title}</div>
                        <div className="poster-client">{item.client}</div>
                        <div className="poster-tag">{item.tag}</div>
                      </div>

                      {/* Play Button Indicator */}
                      <div className="poster-play-btn">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polygon points="5 3 19 12 5 21 5 3" fill="currentColor" />
                        </svg>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Ambient Overlay background */}
        <div className="hero-overlay-dark" />

        {/* Scroll down indicator */}
        <div className="scroll-down">
          <div className="scroll-line" />
        </div>
      </section>

      {/* Work intro */}
      <div className="work-intro">
        <div className="reveal">
          <div className="section-label">WORK</div>
          <h2 className="big">
            WE LISTEN.
            <br />
            WE CRAFT.
            <br />
            WE DELIVER.
          </h2>
        </div>
        <div className="work-intro-more reveal d2">
          <a href="#" className="explore-btn">EXPLORE MORE WORK</a>
        </div>
      </div>

      {/* Work panels - VIEW MORE without popup */}
      <div id="work-section">
        {WORK_PANELS.map((p, i) => {
          const delayClass = i === 1 ? 'd1' : i === 2 ? 'd2' : '';
          return (
            <div key={p.num} className={`work-panel reveal ${delayClass}`}>
              <div className="work-panel-media">
                <img
                  className="work-panel-img"
                  src={p.image}
                  alt={`${p.client} ${p.title}`}
                  loading="lazy"
                />
              </div>
              <div className="work-panel-content">
                <div className="work-panel-num">{p.num}</div>
                <div className="work-panel-tag">{p.tag}</div>
                <div className="work-panel-client">
                  {p.client.split('\n').map((line, li) => (
                    <span key={li}>
                      {line}
                      {li < p.client.split('\n').length - 1 && <br />}
                    </span>
                  ))}
                </div>
                <div className="work-panel-title">{p.title}</div>
                <div className="work-panel-cta">
                  VIEW MORE
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Services */}
      <section id="services-section">
        <div className="services-media reveal">
          <img
            className="services-img"
            src="/firstpictureshowcompany/uploads/services.webp"
            alt="Services"
            loading="lazy"
          />
        </div>
        <div className="services-text reveal d1">
          <div className="section-label">OUR SERVICES</div>
          <h2 className="big" style={{ marginBottom: '2rem' }}>
            STYLISH PRODUCTION.
            <br />
            SEAMLESS EXECUTION.
          </h2>
          <p
            style={{
              fontSize: '0.85rem',
              color: 'var(--text-gray)',
              lineHeight: 1.8,
              marginBottom: '3rem',
              maxWidth: '420px',
            }}
          >
            From concept to delivery, we handle every frame with intention.
            Brand films, commercials, music videos, documentaries — we make it
            look effortless because we've done the hard work.
          </p>
          <a href="#" className="explore-btn">
            STUFF WE'RE REALLY GOOD AT
          </a>
        </div>
      </section>

      {/* About */}
      <section id="about-section">
        <div className="text-left reveal">
          <div className="section-label">ABOUT US</div>
          <h2 className="big" style={{ marginBottom: '2rem' }}>
            WE'RE NOT A CULT.
            <br />
            BUT PEOPLE DO
            <br />
            KEEP COMING BACK.
          </h2>
          <p
            style={{
              fontSize: '0.85rem',
              color: 'var(--text-gray)',
              lineHeight: 1.8,
              marginBottom: '3rem',
              maxWidth: '420px',
            }}
          >
            As a pair of determined storytellers, Brijith and Aiswarya
            love creating engaging scripts and thoughtful films for the products
            and that elevates the brand.
          </p>
          <a href="#" className="explore-btn">LEARN MORE ABOUT US</a>
        </div>
        <div className="media-right reveal d1">
          <img
            className="about-img"
            src="/firstpictureshowcompany/uploads/about.webp"
            alt="About First Picture Show Company"
            loading="lazy"
          />
        </div>
      </section>

      {/* BTS */}
      <section id="bts-section">
        <div className="bts-header reveal">
          <div className="section-label">BTS</div>
          <h2 className="big" style={{ marginBottom: '1rem' }}>
            WE PROBABLY
            <br />
            SHOULDN'T POST THIS...
          </h2>
          <a
            href="#"
            className="explore-btn"
            style={{ marginTop: '2rem', display: 'inline-block' }}
          >
            BEHIND THE SCENES
          </a>
        </div>
        <div className="bts-grid" style={{ marginTop: '3rem' }}>
          {BTS_IMAGES.map((src, i) => (
            <img
              key={src}
              className={`bts-img reveal ${
                i === 1 ? 'd1' : i === 2 ? 'd2' : i === 3 ? 'd3' : ''
              }`}
              src={src}
              alt={`BTS ${i + 1}`}
              loading="lazy"
            />
          ))}
        </div>
      </section>

      {/* Showreel - plays inline (original behavior) */}
      <section id="showreel-section">
        <div className="showreel-inner">
          <video
            ref={showreelVideoRef}
            className={`showreel-video ${showreelPlaying ? 'loaded' : ''}`}
            muted
            loop
            playsInline
            preload="none"
          />
          <img
            className="showreel-cover"
            src="https://cdn.prod.website-files.com/6891a5aecbde722a4a9adbba/68cc5e7aa2a48ddcc849db19_1820%20reel%20vid%20cover%20(1).avif"
            alt="Showreel cover"
            loading="lazy"
            style={{ opacity: showreelPlaying ? 0 : 1 }}
          />
          <div
            className="showreel-ui"
            style={{ opacity: showreelPlaying ? 0 : 1 }}
          >
            <div className="showreel-label">OUR SHOWREEL</div>
            <div className="showreel-title reveal">
              THE HYPE
              <br />
              IS REEL.
            </div>
            <button
              className="showreel-play"
              onClick={playShowreel}
              aria-label="Play showreel"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="var(--white)"
              >
                <path d="M5 3l14 9-14 9V3z" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      <div className="page_end">
        {/* Clients */}
        <section id="clients-section">
          <div className="clients-header reveal">
            <div className="section-label">CLIENTS AND PARTNERS</div>
            <h2 className="big" style={{ marginBottom: '1.5rem' }}>
              BRANDS WHO
              <br />
              SWIPED RIGHT.
            </h2>
            <p className="clients-sub">
              Got a vision? We've got caffeine and emotional availability.
            </p>
          </div>
          <div
            className="clients-logos reveal d1"
            style={{ marginTop: '3rem' }}
          >
            {CLIENTS.map((c) => (
              <div className="client-cell" key={c}>
                <span className="client-name">{c}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
         <div className="footer_sticky" ref={footerRef}>
          <footer className="page_footer">
            <div className="page_footer_contain u-container">
              <div className="page_footer_layout u-grid-custom">
                <div className="page_footer_main_col u-column-custom">
                  <div className="page_footer_inner_layout u-grid-custom">
                    <div className="page_footer_inner_col u-column-4">
                      <div className="page_footer_heading_wrap">
                        <p className="page_footer_heading_text h5-alt">
                          Got a vision? We’ve got caffeine and emotional availability.
                        </p>
                      </div>
                    </div>
                    <div className="page_footer_inner_col u-column-4 is--middle">
                      <div className="page_footer_inner_empty"></div>
                    </div>
                    <div className="page_footer_inner_col u-column-4">
                      <div className="page_footer_link_wrap">
                        <ul role="list" className="page_nav_ul is--footer w-list-unstyled">
                          <li className="page_nav_li is--footer">
                            <a href="#work-section" className="page_nav_link_wrap w-inline-block">
                              <div className="page_nav_link_page">
                                <p className="page_nav_link_text p-sm">Work</p>
                              </div>
                            </a>
                          </li>
                          <li className="page_nav_li is--footer">
                            <a href="#services-section" className="page_nav_link_wrap w-inline-block">
                              <div className="page_nav_link_page">
                                <p className="page_nav_link_text p-sm">Services</p>
                              </div>
                            </a>
                          </li>
                          <li className="page_nav_li is--footer">
                            <a href="#about-section" className="page_nav_link_wrap w-inline-block">
                              <div className="page_nav_link_page">
                                <p className="page_nav_link_text p-sm">About</p>
                              </div>
                            </a>
                          </li>
                          <li className="page_nav_li is--footer">
                            <a href="#bts-section" className="page_nav_link_wrap w-inline-block">
                              <div className="page_nav_link_page">
                                <p className="page_nav_link_text p-sm">BTS</p>
                              </div>
                            </a>
                          </li>
                          <li className="page_nav_li is--footer">
                            <a href="#clients-section" className="page_nav_link_wrap w-inline-block">
                              <div className="page_nav_link_page">
                                <p className="page_nav_link_text p-sm">Contact</p>
                              </div>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="page_footer_inner_col u-column-4">
                      <div className="page_footer_util_wrap">
                        <div className="page_footer_util_flex">
                          <div className="page_footer_util_heading_wrap">
                            <p className="page_footer_util_heading_text p-xs">OUR ADDRESS</p>
                          </div>
                          <ul role="list" className="page_nav_ul is--footer w-list-unstyled">
                            <li className="page_nav_li is--footer">
                              <a href="https://maps.app.goo.gl/GzpzuWxeD5izwD3RA" target="_blank" rel="noreferrer" className="page_nav_link_wrap w-inline-block">
                                <div className="page_nav_link_page">
                                  <p className="page_nav_link_text p-sm">
                                    SRA E7, Soumya nagar, Alinchuvad<br />
                                    Padivattom, Edapally South<br />
                                    Cochin, Kerala 682028
                                  </p>
                                </div>
                              </a>
                            </li>
                          </ul>
                        </div>
                        <div class="page_footer_inner_line_top"></div>
                      </div>
                    </div>
                    <div className="page_footer_inner_col u-column-4">
                      <div className="page_footer_util_wrap">
                        <div className="page_footer_util_flex">
                          <div className="page_footer_util_heading_wrap">
                            <p className="page_footer_util_heading_text p-xs">GET IN TOUCH</p>
                          </div>
                          <ul role="list" className="page_nav_ul is--footer w-list-unstyled">
                            <li className="page_nav_li is--footer">
                              <a href="mailto:sayhello@firstpictureshowcompany.com" className="page_nav_link_wrap w-inline-block">
                                <div className="page_nav_link_page">
                                  <p className="page_nav_link_text p-sm">sayhello@firstpictureshowcompany.com</p>
                                </div>
                              </a>
                            </li>
                            <li className="page_nav_li is--footer">
                              <a href="tel:+19728697778" className="page_nav_link_wrap w-inline-block">
                                <div className="page_nav_link_page">
                                  <p className="page_nav_link_text p-sm">80860.84320</p>
                                </div>
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div class="page_footer_inner_line_top"></div>
                    </div>
                    <div className="page_footer_inner_col u-column-4">
                      <div className="page_footer_util_wrap">
                        <div className="page_footer_util_flex">
                          <div className="page_footer_util_heading_wrap">
                            <p className="page_footer_util_heading_text p-xs">SOCIALS</p>
                          </div>
                          <ul role="list" className="page_nav_ul is--footer w-list-unstyled">
                            <li className="page_nav_li is--footer">
                              <a href="https://www.instagram.com/firstpictureshowcompany/" target="_blank" rel="noreferrer" className="page_nav_link_wrap w-inline-block">
                                <div className="page_nav_link_page">
                                  <p className="page_nav_link_text p-sm">Instagram</p>
                                </div>
                              </a>
                            </li>
                            <li className="page_nav_li is--footer">
                              <a href="https://www.youtube.com/@firstpictureshowcompany7859" target="_blank" rel="noreferrer" className="page_nav_link_wrap w-inline-block">
                                <div className="page_nav_link_page">
                                  <p className="page_nav_link_text p-sm">Youtube</p>
                                </div>
                              </a>
                            </li>
                            <li className="page_nav_li is--footer">
                              <a href="https://www.facebook.com/tfpscompany/" target="_blank" rel="noreferrer" className="page_nav_link_wrap w-inline-block">
                                <div className="page_nav_link_page">
                                  <p className="page_nav_link_text p-sm">Facebook</p>
                                </div>
                              </a>
                            </li>
                            <li className="page_nav_li is--footer">
                              <a href="https://www.linkedin.com/in/first-picture-show-company-217611323/" target="_blank" rel="noreferrer" className="page_nav_link_wrap w-inline-block">
                                <div className="page_nav_link_page">
                                  <p className="page_nav_link_text p-sm">LinkedIn</p>
                                </div>
                              </a>
                            </li>
                          </ul>
                        </div>
                        <div class="page_footer_inner_line_top"></div>
                      </div>
                    </div>
                  </div>
                  <div className="page_footer_util_layout">
                    <div className="page_footer_copyright_wrap">
                      <p className="page_footer_copyright_text p-xs">© First Picture Show Company, 2026</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </footer>
          </div>
      </div>
    </>
  );
}
