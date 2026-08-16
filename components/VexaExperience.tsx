"use client";

import { CSSProperties, PointerEvent, useEffect, useRef, useState } from "react";

type Product = {
  name: string;
  edition: string;
  tone: string;
  accent: string;
  accentRgb: string;
  image: string;
  profile: string;
  note: string;
};

const products: Product[] = [
  {
    name: "GOLD",
    edition: "Yuzu Original",
    tone: "01 / SIGNATURE",
    accent: "#ffbd37",
    accentRgb: "255, 189, 55",
    image: "/images/vexa-gold.png",
    profile: "Чистый цитрусовый профиль юдзу с сухим, собранным финишем.",
    note: "Яркий старт",
  },
  {
    name: "AQUA",
    edition: "Arctic Yuzu",
    tone: "02 / ZERO NOISE",
    accent: "#2cf5e5",
    accentRgb: "44, 245, 229",
    image: "/images/vexa-aqua.png",
    profile: "Прохладная интерпретация юдзу — свежая, лёгкая и точная.",
    note: "Холодный импульс",
  },
  {
    name: "PULSE",
    edition: "Berry Voltage",
    tone: "03 / NIGHT SHIFT",
    accent: "#ff3f9f",
    accentRgb: "255, 63, 159",
    image: "/images/vexa-pulse.png",
    profile: "Ягодный характер, глубокая кислинка и эффектное послевкусие.",
    note: "Ночной ритм",
  },
  {
    name: "NEBULA",
    edition: "Yuzu Fusion",
    tone: "04 / LIMITLESS",
    accent: "#9bff45",
    accentRgb: "155, 255, 69",
    image: "/images/vexa-nebula.png",
    profile: "Многослойный цитрусовый микс с яркой зелёной нотой.",
    note: "За пределами",
  },
];

const facts = [
  ["66 мг", "кофеина"],
  ["6,6 г", "коллаген-пептидов"],
  ["1 г", "BCAA"],
  ["1,3 г", "таурина"],
];

function ArrowIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d="M5 12h13M13 6l6 6-6 6" />
    </svg>
  );
}

function BoltIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d="m14 2-9 12h7l-2 8 9-12h-7z" />
    </svg>
  );
}

export default function VexaExperience() {
  const storyRef = useRef<HTMLElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const [activeProduct, setActiveProduct] = useState<number | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;
      const y = window.scrollY;
      setScrolled(y > 40);

      const story = storyRef.current;
      if (story) {
        const rect = story.getBoundingClientRect();
        const travel = Math.max(1, story.offsetHeight - window.innerHeight);
        const progress = Math.min(1, Math.max(0, -rect.top / travel));
        story.style.setProperty("--p", progress.toFixed(4));
        story.style.setProperty("--spin", `${progress * 14 - 7}deg`);
      }
    };

    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    const onPointer = (event: MouseEvent) => {
      const hero = heroRef.current;
      if (!hero) return;
      const x = (event.clientX / window.innerWidth - 0.5) * 2;
      const y = (event.clientY / window.innerHeight - 0.5) * 2;
      hero.style.setProperty("--mx", x.toFixed(3));
      hero.style.setProperty("--my", y.toFixed(3));
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    window.addEventListener("mousemove", onPointer, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("mousemove", onPointer);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("is-visible");
        });
      },
      { threshold: 0.16 }
    );
    document.querySelectorAll(".reveal").forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = activeProduct === null ? "" : "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveProduct(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeProduct]);

  const tilt = (event: PointerEvent<HTMLElement>) => {
    const card = event.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    card.style.setProperty("--ry", `${x * 6}deg`);
    card.style.setProperty("--rx", `${y * -6}deg`);
  };

  const resetTilt = (event: PointerEvent<HTMLElement>) => {
    event.currentTarget.style.setProperty("--ry", "0deg");
    event.currentTarget.style.setProperty("--rx", "0deg");
  };

  const scrollToCollection = () => {
    document.querySelector("#collection")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main>
      <div className="noise" aria-hidden="true" />
      <div className="scroll-progress" aria-hidden="true" />

      <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
        <a className="brand" href="#top" aria-label="VEXA — на главную">
          VEXA<span>®</span>
        </a>
        <nav className={menuOpen ? "is-open" : ""} aria-label="Основная навигация">
          <a href="#collection" onClick={() => setMenuOpen(false)}>Коллекция</a>
          <a href="#formula" onClick={() => setMenuOpen(false)}>Формула</a>
          <a href="#about" onClick={() => setMenuOpen(false)}>О VEXA</a>
        </nav>
        <button className="header-cta" onClick={scrollToCollection}>
          Смотреть вкусы <ArrowIcon />
        </button>
        <button
          className={`menu-button ${menuOpen ? "is-open" : ""}`}
          onClick={() => setMenuOpen((value) => !value)}
          aria-label="Открыть меню"
          aria-expanded={menuOpen}
        >
          <span /><span />
        </button>
      </header>

      <section className="hero" id="top" ref={heroRef}>
        <div className="hero-orbit orbit-one" aria-hidden="true" />
        <div className="hero-orbit orbit-two" aria-hidden="true" />
        <div className="hero-grid" aria-hidden="true" />

        <div className="hero-copy">
          <p className="eyebrow"><span /> Functional energy / 330 ml</p>
          <h1>
            <span>ЭНЕРГИЯ</span>
            <span className="outline">БУДУЩЕГО</span>
          </h1>
          <p className="hero-lead">
            Функциональный напиток для энергии, фокуса и восстановления.
            Чистый дизайн. Точная формула. Яркий характер.
          </p>
          <div className="hero-actions">
            <button className="primary-button" onClick={scrollToCollection}>
              Исследовать VEXA <span><ArrowIcon /></span>
            </button>
            <div className="micro-copy">
              <BoltIcon />
              <span><b>66 мг</b> кофеина в банке</span>
            </div>
          </div>
        </div>

        <div className="hero-product" aria-label="Две банки энергетического напитка VEXA Gold">
          <div className="energy-halo" aria-hidden="true" />
          <div className="can-shadow" aria-hidden="true" />
          <img
            src="/images/vexa-gold-transparent.png"
            alt="VEXA Gold — вид спереди и сзади"
            width="640"
            height="480"
          />
          <div className="can-reflection" aria-hidden="true" />
          <span className="product-callout callout-one"><i /> Состав нового поколения</span>
          <span className="product-callout callout-two"><i /> Yuzu original</span>
        </div>

        <div className="hero-bottom">
          <span>ENERGY</span><i />
          <span>FOCUS</span><i />
          <span>RECOVERY</span>
        </div>
        <a className="scroll-hint" href="#experience" aria-label="Прокрутить к следующему разделу">
          <span>SCROLL TO ACTIVATE</span><i />
        </a>
      </section>

      <section className="story" id="experience" ref={storyRef}>
        <div className="story-sticky">
          <div className="story-glow" aria-hidden="true" />
          <p className="story-index">01 — ПРИКОСНИСЬ К ЭНЕРГИИ</p>
          <div className="story-copy story-copy-left">
            <p>СОБРАНО ДЛЯ ДВИЖЕНИЯ</p>
            <h2>ВКЛЮЧАЕТСЯ<br />В НУЖНЫЙ <em>МОМЕНТ.</em></h2>
          </div>
          <div className="flight-can" aria-hidden="true">
            <img src="/images/vexa-gold-transparent.png" alt="" />
          </div>
          <div className="flight-rings" aria-hidden="true"><i /><i /><i /></div>
          <div className="story-copy story-copy-right">
            <span>FORMULA 01</span>
            <p>Энергия без визуального шума. Продукт становится частью пространства и реагирует на ваше движение.</p>
          </div>
          <div className="story-meter" aria-hidden="true">
            <span>0</span><div><i /></div><span>100</span>
          </div>
        </div>
      </section>

      <section className="collection section-shell" id="collection">
        <div className="section-heading reveal">
          <div>
            <p className="eyebrow"><span /> 04 VISUAL EDITIONS</p>
            <h2>ВЫБЕРИ СВОЙ<br /><em>ИМПУЛЬС.</em></h2>
          </div>
          <p>Четыре характера одной функциональной формулы. Открой карточку, чтобы рассмотреть банку и узнать детали.</p>
        </div>

        <div className="product-grid">
          {products.map((product, index) => (
            <article
              className="product-card reveal"
              key={product.name}
              style={{
                "--accent": product.accent,
                "--accent-rgb": product.accentRgb,
              } as CSSProperties}
              onPointerMove={tilt}
              onPointerLeave={resetTilt}
            >
              <div className="card-topline">
                <span>{product.tone}</span>
                <span>330 ML</span>
              </div>
              <div className="product-image-wrap">
                <div className="card-glow" aria-hidden="true" />
                <img src={product.image} alt={`Две банки VEXA ${product.name}`} loading="lazy" />
              </div>
              <div className="card-content">
                <div>
                  <h3>{product.name}</h3>
                  <p>{product.edition}</p>
                </div>
                <button onClick={() => setActiveProduct(index)} aria-label={`Подробнее о VEXA ${product.name}`}>
                  <ArrowIcon />
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="formula" id="formula">
        <div className="formula-background" aria-hidden="true">
          <span>VEXA</span>
          <span>VEXA</span>
        </div>
        <div className="formula-visual reveal">
          <div className="formula-image">
            <img src="/images/vexa-nebula.png" alt="VEXA Nebula — передняя и задняя сторона банки" loading="lazy" />
          </div>
          <span className="formula-label label-energy"><i /> ENERGY</span>
          <span className="formula-label label-focus"><i /> FOCUS</span>
          <span className="formula-label label-recovery"><i /> RECOVERY</span>
        </div>
        <div className="formula-content reveal">
          <p className="eyebrow"><span /> INSIDE THE FORMULA</p>
          <h2>НИЧЕГО<br />ЛИШНЕГО.<br /><em>ТОЛЬКО ИМПУЛЬС.</em></h2>
          <p className="formula-lead">Формула, которую можно прочитать. Ключевые компоненты указаны на банке — здесь мы собрали главное.</p>
          <div className="facts-grid">
            {facts.map(([value, label], index) => (
              <div key={label}>
                <span>0{index + 1}</span>
                <strong>{value}</strong>
                <p>{label}</p>
              </div>
            ))}
          </div>
          <p className="formula-footnote">Содержание компонентов указано на 330 мл продукта. Высокое содержание кофеина.</p>
        </div>
      </section>

      <section className="manifesto section-shell" id="about">
        <div className="manifesto-top reveal">
          <span>VEXA / 2026</span>
          <p>Не просто напиток.<br />Состояние готовности.</p>
        </div>
        <h2 className="reveal">
          СКОНЦЕНТРИРУЙСЯ.<br />
          <span>ДВИГАЙСЯ.</span> ВОССТАНАВЛИВАЙСЯ.
        </h2>
        <div className="manifesto-bottom reveal">
          <p>Мы создаём VEXA для моментов, когда идея должна превратиться в действие.</p>
          <button className="primary-button" onClick={scrollToCollection}>
            Найти свою VEXA <span><ArrowIcon /></span>
          </button>
        </div>
      </section>

      <footer>
        <a className="footer-brand" href="#top">VEXA<span>®</span></a>
        <div className="footer-links">
          <a href="#collection">Коллекция</a>
          <a href="#formula">Формула</a>
          <a href="#about">О бренде</a>
        </div>
        <p>Высокое содержание кофеина. Не рекомендуется детям, беременным и кормящим женщинам. Информация на сайте носит ознакомительный характер.</p>
        <div className="footer-bottom"><span>© 2026 VEXA ENERGY</span><span>DESIGNED TO MOVE</span></div>
      </footer>

      {activeProduct !== null && (
        <div className="product-modal" role="dialog" aria-modal="true" aria-label={`VEXA ${products[activeProduct].name}`}>
          <button className="modal-backdrop" onClick={() => setActiveProduct(null)} aria-label="Закрыть карточку" />
          <article
            className="modal-card"
            style={{
              "--accent": products[activeProduct].accent,
              "--accent-rgb": products[activeProduct].accentRgb,
            } as CSSProperties}
          >
            <button className="modal-close" onClick={() => setActiveProduct(null)} aria-label="Закрыть">
              <span /><span />
            </button>
            <div className="modal-visual">
              <div className="modal-glow" aria-hidden="true" />
              <img src={products[activeProduct].image} alt={`VEXA ${products[activeProduct].name}`} />
              <span>{products[activeProduct].tone}</span>
            </div>
            <div className="modal-copy">
              <p className="eyebrow"><span /> {products[activeProduct].note}</p>
              <h2>{products[activeProduct].name}</h2>
              <h3>{products[activeProduct].edition}</h3>
              <p className="modal-description">{products[activeProduct].profile}</p>
              <dl>
                <div><dt>Объём</dt><dd>330 мл</dd></div>
                <div><dt>Кофеин</dt><dd>66 мг</dd></div>
                <div><dt>Коллаген</dt><dd>6,6 г</dd></div>
                <div><dt>BCAA</dt><dd>1 г</dd></div>
              </dl>
              <p className="modal-warning">Высокое содержание кофеина. Состав и дизайн упаковки смотрите на изображении продукта.</p>
              <div className="modal-navigation">
                <button onClick={() => setActiveProduct((activeProduct + products.length - 1) % products.length)}>← Предыдущая</button>
                <span>{String(activeProduct + 1).padStart(2, "0")} / 04</span>
                <button onClick={() => setActiveProduct((activeProduct + 1) % products.length)}>Следующая →</button>
              </div>
            </div>
          </article>
        </div>
      )}
    </main>
  );
}
