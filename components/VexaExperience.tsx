"use client";

import { CSSProperties, PointerEvent, useEffect, useRef, useState } from "react";

type Ingredient = {
  name: string;
  amount: string;
};

type Product = {
  name: string;
  edition: string;
  tone: string;
  accent: string;
  accentRgb: string;
  image: string;
  profile: string;
  note: string;
  ingredients: Ingredient[];
  featured?: boolean;
  badge?: string;
};

const createFormula = ({
  flavors,
  ginseng = false,
  collagen = "Hydrolyzed collagen",
  sucralose = "~0.04 g",
}: {
  flavors: Ingredient[];
  ginseng?: boolean;
  collagen?: string;
  sucralose?: string;
}): Ingredient[] => [
  { name: "Carbonated water", amount: "Base" },
  { name: collagen, amount: "6.6 g" },
  { name: "BCAA", amount: "1 g" },
  { name: "Caffeine anhydrous", amount: "66 mg" },
  { name: "Taurine", amount: "1.3 g" },
  ...(ginseng ? [{ name: "Ginseng extract", amount: "0.17 g" }] : []),
  { name: "Citric acid", amount: "To pH ~3.0–3.3" },
  { name: "Potassium citrate", amount: "0.33 g" },
  { name: "Sucralose", amount: sucralose },
  ...flavors,
  { name: "Sodium benzoate", amount: "0.13–0.17 g" },
];

const products: Product[] = [
  {
    name: "GOLD",
    edition: "Yuzu–Ginseng",
    tone: "01 / SIGNATURE",
    accent: "#ffbd37",
    accentRgb: "255, 189, 55",
    image: "/images/vexa-gold-transparent.png",
    profile: "Bright yuzu citrus sharpened by the warm, focused depth of ginseng.",
    note: "Bright ignition",
    badge: "CORE EDITION",
    ingredients: createFormula({
      ginseng: true,
      flavors: [{ name: "Natural yuzu flavor", amount: "0.5–1 ml" }],
    }),
  },
  {
    name: "PRISM",
    edition: "Grape–Lychee",
    tone: "02 / DUAL SIGNAL",
    accent: "#b9ff52",
    accentRgb: "185, 255, 82",
    image: "/images/vexa-nebula-transparent.png",
    profile: "Juicy grape refracted through a delicate, luminous lychee finish.",
    note: "Full spectrum",
    badge: "PRISM EDITION",
    ingredients: createFormula({
      flavors: [
        { name: "Natural grape flavor", amount: "0.4–0.7 ml" },
        { name: "Natural lychee flavor", amount: "0.3–0.6 ml" },
      ],
    }),
  },
  {
    name: "TIDE",
    edition: "Mint–Cucumber",
    tone: "03 / ZERO NOISE",
    accent: "#2cf5e5",
    accentRgb: "44, 245, 229",
    image: "/images/vexa-aqua-transparent.png",
    profile: "Clean cucumber freshness carried by a cool, controlled mint current.",
    note: "Clean current",
    badge: "TIDAL EDITION",
    ingredients: createFormula({
      flavors: [
        { name: "Natural cucumber flavor", amount: "0.3–0.5 ml" },
        { name: "Natural mint flavor", amount: "0.1–0.2 ml" },
      ],
    }),
  },
  {
    name: "NOIR",
    edition: "Cherry–Pink Grapefruit",
    tone: "04 / NIGHT SHIFT",
    accent: "#ff3f9f",
    accentRgb: "255, 63, 159",
    image: "/images/vexa-pulse-transparent.png",
    profile: "Dark cherry intensity cut with the vivid bitterness of pink grapefruit.",
    note: "After-dark voltage",
    badge: "NOIR EDITION",
    ingredients: createFormula({
      flavors: [
        { name: "Natural cherry flavor", amount: "0.4–0.7 ml" },
        { name: "Natural pink grapefruit flavor", amount: "0.3–0.5 ml" },
      ],
    }),
  },
  {
    name: "FROST",
    edition: "Mint–Lime",
    tone: "05 / CRYO EDITION",
    accent: "#d8f5ff",
    accentRgb: "216, 245, 255",
    image: "/images/vexa-frost-transparent.png",
    profile: "A crystalline lime strike with a precise, subzero mint finish.",
    note: "Subzero clarity",
    badge: "CRYO EDITION",
    featured: true,
    ingredients: createFormula({
      collagen: "Hydrolyzed collagen (peptides)",
      sucralose: "~0.04 g, to taste",
      flavors: [
        { name: "Natural lime flavor", amount: "0.4–0.7 ml, to taste" },
        { name: "Natural mint flavor", amount: "0.15–0.3 ml, to taste" },
      ],
    }),
  },
  {
    name: "EMBER",
    edition: "Ginger–Grapefruit",
    tone: "06 / SPICE SIGNAL",
    accent: "#a6e06b",
    accentRgb: "166, 224, 107",
    image: "/images/vexa-ember-transparent.png",
    profile: "A vivid grapefruit edge grounded by the warm, botanical pulse of ginger.",
    note: "Botanical ignition",
    badge: "BOTANICAL EDITION",
    ingredients: createFormula({
      collagen: "Hydrolyzed collagen (peptides)",
      sucralose: "~0.04 g, to taste",
      flavors: [
        { name: "Natural grapefruit flavor", amount: "0.4–0.7 ml, to taste" },
        { name: "Natural ginger flavor", amount: "0.2–0.4 ml, to taste" },
      ],
    }),
  },
  {
    name: "AURA",
    edition: "Pear–Cardamom",
    tone: "07 / AROMATIC CORE",
    accent: "#f1a6a0",
    accentRgb: "241, 166, 160",
    image: "/images/vexa-aura-transparent.png",
    profile: "Silky pear brightness lifted by a precise, aromatic trace of cardamom.",
    note: "Rose-gold clarity",
    badge: "ROSE EDITION",
    ingredients: createFormula({
      collagen: "Hydrolyzed collagen (peptides)",
      sucralose: "~0.04 g, to taste",
      flavors: [
        { name: "Natural pear flavor", amount: "0.4–0.7 ml, to taste" },
        { name: "Natural cardamom flavor", amount: "0.1–0.2 ml, to taste" },
      ],
    }),
  },
  {
    name: "BLOOM",
    edition: "White Peach–Jasmine",
    tone: "08 / SILK SIGNAL",
    accent: "#ffcf9d",
    accentRgb: "255, 207, 157",
    image: "/images/vexa-bloom-transparent.png",
    profile: "Velvety white peach carried by a delicate jasmine bloom and a clean, luminous finish.",
    note: "Floral lift",
    badge: "NEW EDITION",
    featured: true,
    ingredients: createFormula({
      collagen: "Hydrolyzed collagen (peptides)",
      sucralose: "~0.04 g, to taste",
      flavors: [
        { name: "Natural white peach flavor", amount: "~0.4–0.7 ml, to taste" },
        { name: "Natural jasmine flavor", amount: "~0.05–0.15 ml, to taste" },
      ],
    }),
  },
];

const facts = [
  ["66 mg", "caffeine"],
  ["6.6 g", "collagen peptides"],
  ["1 g", "BCAA"],
  ["1.3 g", "taurine"],
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

function FormulaTable({ product, compact = false }: { product: Product; compact?: boolean }) {
  return (
    <div className={`formula-table-wrap ${compact ? "is-compact" : ""}`}>
      <table className="formula-table">
        <caption className="sr-only">VEXA {product.name} concept formulation per 330 ml</caption>
        <thead>
          <tr><th>Ingredient</th><th>Amount per 330 ml</th></tr>
        </thead>
        <tbody>
          {product.ingredients.map((ingredient) => (
            <tr key={ingredient.name}>
              <td>{ingredient.name}</td>
              <td>{ingredient.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function VexaExperience() {
  const storyRef = useRef<HTMLElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const [activeProduct, setActiveProduct] = useState<number | null>(null);
  const [activeFormula, setActiveFormula] = useState(0);
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

  const formulaProduct = products[activeFormula];

  const moveFormulaSelection = (event: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    const keys = ["ArrowLeft", "ArrowRight", "Home", "End"];
    if (!keys.includes(event.key)) return;
    event.preventDefault();
    const nextIndex = event.key === "Home"
      ? 0
      : event.key === "End"
        ? products.length - 1
        : (index + (event.key === "ArrowRight" ? 1 : -1) + products.length) % products.length;
    setActiveFormula(nextIndex);
    document.querySelector<HTMLButtonElement>(`[data-formula-index="${nextIndex}"]`)?.focus();
  };

  return (
    <main>
      <div className="noise" aria-hidden="true" />
      <div className="scroll-progress" aria-hidden="true" />

      <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
        <a className="brand" href="#top" aria-label="VEXA — home">
          VEXA<span>®</span>
        </a>
        <nav className={menuOpen ? "is-open" : ""} aria-label="Primary navigation">
          <a href="#collection" onClick={() => setMenuOpen(false)}>Editions</a>
          <a href="#formula" onClick={() => setMenuOpen(false)}>Formula</a>
          <a href="#about" onClick={() => setMenuOpen(false)}>About VEXA</a>
        </nav>
        <button className="header-cta" onClick={scrollToCollection}>
          Explore editions <ArrowIcon />
        </button>
        <button
          className={`menu-button ${menuOpen ? "is-open" : ""}`}
          onClick={() => setMenuOpen((value) => !value)}
          aria-label="Open menu"
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
            <span>ENERGY</span>
            <span className="outline">OF THE FUTURE</span>
          </h1>
          <p className="hero-lead">
            Functional energy engineered for focus, motion and recovery.
            Pure design. Precise formula. Unmistakable character.
          </p>
          <div className="hero-actions">
            <button className="primary-button" onClick={scrollToCollection}>
              Explore VEXA <span><ArrowIcon /></span>
            </button>
            <div className="micro-copy">
              <BoltIcon />
              <span><b>66 mg</b> caffeine per can</span>
            </div>
          </div>
        </div>

        <div className="hero-product" aria-label="VEXA Gold energy drink, front and back cans">
          <div className="energy-halo" aria-hidden="true" />
          <div className="can-shadow" aria-hidden="true" />
          <img
            src="/images/vexa-gold-transparent.png"
            alt="VEXA Gold — front and back"
            width="640"
            height="480"
          />
          <div className="can-reflection" aria-hidden="true" />
          <span className="product-callout callout-one"><i /> Next-generation formula</span>
          <span className="product-callout callout-two"><i /> Yuzu–Ginseng</span>
        </div>

        <div className="hero-bottom">
          <span>ENERGY</span><i />
          <span>FOCUS</span><i />
          <span>RECOVERY</span>
        </div>
        <a className="scroll-hint" href="#experience" aria-label="Scroll to the next section">
          <span>SCROLL TO ACTIVATE</span><i />
        </a>
      </section>

      <section className="story" id="experience" ref={storyRef}>
        <div className="story-sticky">
          <div className="story-glow" aria-hidden="true" />
          <p className="story-index">01 — ENTER THE ENERGY FIELD</p>
          <div className="story-copy story-copy-left">
            <p>BUILT FOR MOTION</p>
            <h2>ACTIVATES<br />WHEN IT <em>MATTERS.</em></h2>
          </div>
          <div className="flight-can" aria-hidden="true">
            <img src="/images/vexa-gold-transparent.png" alt="" />
          </div>
          <div className="flight-rings" aria-hidden="true"><i /><i /><i /></div>
          <div className="story-copy story-copy-right">
            <span>FORMULA 01</span>
            <p>Energy without visual noise. The product becomes part of the space and responds to your movement.</p>
          </div>
          <div className="story-meter" aria-hidden="true">
            <span>0</span><div><i /></div><span>100</span>
          </div>
        </div>
      </section>

      <section className="collection section-shell" id="collection">
        <div className="section-heading reveal">
          <div>
            <p className="eyebrow"><span /> 08 VISUAL EDITIONS</p>
            <h2>CHOOSE YOUR<br /><em>IMPULSE.</em></h2>
          </div>
          <p>Eight distinct characters. One functional core. Open an edition to inspect every detail.</p>
        </div>

        <div className="product-grid">
          {products.map((product, index) => (
            <article
              className={`product-card reveal ${product.featured ? "is-featured" : ""}`}
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
                <span>{product.badge ?? "330 ML"}</span>
              </div>
              <div className="product-image-wrap">
                <div className="edition-grid" aria-hidden="true" />
                <div className="card-glow" aria-hidden="true" />
                <div className="can-pair" aria-hidden="true">
                  <img className="can-half can-half-front" src={product.image} alt="" loading="lazy" />
                  <img className="can-half can-half-back" src={product.image} alt="" loading="lazy" />
                </div>
                <img className="can-pair-reflection" src={product.image} alt="" aria-hidden="true" loading="lazy" />
                <span className="sr-only">VEXA {product.name}, front and back cans</span>
              </div>
              <div className="card-content">
                <div>
                  <h3>{product.name}</h3>
                  <p>{product.edition}</p>
                </div>
                <button onClick={() => setActiveProduct(index)} aria-label={`View VEXA ${product.name} details`}>
                  <ArrowIcon />
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section
        className="formula"
        id="formula"
        style={{
          "--accent": formulaProduct.accent,
          "--accent-rgb": formulaProduct.accentRgb,
        } as CSSProperties}
      >
        <div className="formula-background" aria-hidden="true">
          <span>VEXA</span>
          <span>VEXA</span>
        </div>
        <div className="formula-visual reveal">
          <div className="formula-image" key={formulaProduct.name}>
            <img src={formulaProduct.image} alt={`VEXA ${formulaProduct.name} — front and back cans`} loading="lazy" />
          </div>
          <span className="formula-label label-energy"><i /> ENERGY</span>
          <span className="formula-label label-focus"><i /> FOCUS</span>
          <span className="formula-label label-recovery"><i /> RECOVERY</span>
          <span className="formula-edition-mark">{formulaProduct.tone}</span>
        </div>
        <div className="formula-content reveal">
          <p className="eyebrow"><span /> FORMULA LAB / 330 ML</p>
          <div className="formula-tabs" role="tablist" aria-label="Choose a VEXA formula">
            {products.map((product, index) => (
              <button
                key={product.name}
                id={`formula-tab-${index}`}
                data-formula-index={index}
                role="tab"
                aria-selected={activeFormula === index}
                aria-controls="formula-panel"
                tabIndex={activeFormula === index ? 0 : -1}
                className={activeFormula === index ? "is-active" : ""}
                onClick={() => setActiveFormula(index)}
                onKeyDown={(event) => moveFormulaSelection(event, index)}
              >
                <span>0{index + 1}</span>{product.name}
              </button>
            ))}
          </div>
          <div
            className="formula-panel"
            id="formula-panel"
            role="tabpanel"
            aria-labelledby={`formula-tab-${activeFormula}`}
            key={formulaProduct.name}
          >
            <p className="formula-badge">{formulaProduct.badge}</p>
            <h2>{formulaProduct.name}<br /><em>{formulaProduct.edition}</em></h2>
            <p className="formula-lead">{formulaProduct.profile}</p>
            <div className="formula-facts" aria-label="Core functional ingredients">
              {facts.map(([value, label]) => <span key={label}><strong>{value}</strong>{label}</span>)}
            </div>
            <FormulaTable product={formulaProduct} />
            <p className="formula-footnote">Concept formulation. Packaging artwork is illustrative and may be updated. High caffeine content.</p>
          </div>
        </div>
      </section>

      <section className="manifesto section-shell" id="about">
        <div className="manifesto-top reveal">
          <span>VEXA / 2026</span>
          <p>More than a drink.<br />A state of readiness.</p>
        </div>
        <h2 className="reveal">
          FOCUS.<br />
          <span>MOVE.</span> RECOVER.
        </h2>
        <div className="manifesto-bottom reveal">
          <p>We create VEXA for the moment an idea has to become action.</p>
          <button className="primary-button" onClick={scrollToCollection}>
            Find your VEXA <span><ArrowIcon /></span>
          </button>
        </div>
      </section>

      <footer>
        <a className="footer-brand" href="#top">VEXA<span>®</span></a>
        <div className="footer-links">
          <a href="#collection">Editions</a>
          <a href="#formula">Formula</a>
          <a href="#about">About</a>
        </div>
        <p>High caffeine content. Not recommended for children, pregnant or breastfeeding women. Product information is provided for reference only.</p>
        <div className="footer-bottom"><span>© 2026 VEXA ENERGY</span><span>DESIGNED TO MOVE</span></div>
      </footer>

      {activeProduct !== null && (
        <div className="product-modal" role="dialog" aria-modal="true" aria-label={`VEXA ${products[activeProduct].name}`}>
          <button className="modal-backdrop" onClick={() => setActiveProduct(null)} aria-label="Close product details" />
          <article
            className="modal-card"
            style={{
              "--accent": products[activeProduct].accent,
              "--accent-rgb": products[activeProduct].accentRgb,
            } as CSSProperties}
          >
            <button className="modal-close" onClick={() => setActiveProduct(null)} aria-label="Close">
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
                <div><dt>Volume</dt><dd>330 ml</dd></div>
                <div><dt>Caffeine</dt><dd>66 mg</dd></div>
                <div><dt>Collagen</dt><dd>6.6 g</dd></div>
                <div><dt>BCAA</dt><dd>1 g</dd></div>
              </dl>
              <div className="modal-formula-heading">
                <span>Concept formula</span><span>Per 330 ml</span>
              </div>
              <FormulaTable product={products[activeProduct]} compact />
              <p className="modal-warning">Concept formulation. Packaging artwork is illustrative and may be updated. High caffeine content.</p>
              <div className="modal-navigation">
                <button onClick={() => setActiveProduct((activeProduct + products.length - 1) % products.length)}>← Previous</button>
                <span>{String(activeProduct + 1).padStart(2, "0")} / {String(products.length).padStart(2, "0")}</span>
                <button onClick={() => setActiveProduct((activeProduct + 1) % products.length)}>Next →</button>
              </div>
            </div>
          </article>
        </div>
      )}
    </main>
  );
}
