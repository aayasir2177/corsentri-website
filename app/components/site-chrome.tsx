"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Arrow } from "./ui";
const links = [
  ["Solutions", "/solutions"],
  ["Who we serve", "/who-we-serve"],
  ["MSP partners", "/msp-partners"],
  ["About", "/about"],
  ["Pricing", "/pricing"],
  ["Resources", "/resources"],
];
export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const path = usePathname();
  const toggle = useRef<HTMLButtonElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    setOpen(false);
  }, [path]);
  useEffect(() => {
    if (open) {
      dialog.current?.showModal();
      const before = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = before;
      };
    } else dialog.current?.close();
  }, [open]);
  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <header className="header site-header">
        <Link href="/" className="logo" aria-label="CorSentri home">
          <img
            src="/brand/inverse-logo.png"
            alt="CorSentri"
            width="176"
            height="38"
          />
        </Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          {links.slice(0, 6).map(([name, href]) => (
            <Link
              key={href}
              href={href}
              aria-current={path === href ? "page" : undefined}
            >
              {name}
            </Link>
          ))}
        </nav>
        <Link className="header-cta" href="/book-a-consultation">
          Let’s talk <Arrow />
        </Link>
        <button
          ref={toggle}
          className="menu-toggle"
          onClick={() => setOpen(true)}
          aria-expanded={open}
          aria-controls="site-menu"
        >
          Menu <span>+</span>
        </button>
      </header>
      <dialog
        ref={dialog}
        id="site-menu"
        className="menu-dialog"
        onCancel={() => setOpen(false)}
        aria-label="Navigation"
      >
        <div className="menu-dialog-top">
          <Link href="/" onClick={() => setOpen(false)}>
            <img src="/brand/inverse-logo.png" width="150" alt="CorSentri" />
          </Link>
          <button
            onClick={() => {
              setOpen(false);
              toggle.current?.focus();
            }}
            aria-label="Close menu"
          >
            Close ×
          </button>
        </div>
        <nav aria-label="Mobile navigation">
          {links.map(([name, href], i) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              aria-current={path === href ? "page" : undefined}
            >
              <small>0{i + 1}</small>
              {name}
              <Arrow />
            </Link>
          ))}
          <Link
            href="/book-a-consultation"
            onClick={() => setOpen(false)}
            className="mobile-book"
          >
            Book a consultation <Arrow />
          </Link>
        </nav>
        <p>Smarter security. Greater confidence.</p>
      </dialog>
    </>
  );
}
export function SiteEffects() {
  const path = usePathname();
  useEffect(() => {
    document.documentElement.classList.add("has-motion");
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            observer.unobserve(e.target);
          }
        }),
      { threshold: 0.06 },
    );
    document
      .querySelectorAll("[data-reveal]")
      .forEach((e) => observer.observe(e));
    return () => observer.disconnect();
  }, [path]);
  return null;
}
export function SiteFooter() {
  const [paused, setPaused] = useState(false);
  const settings = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    document.documentElement.classList.toggle("motion-paused", paused);
    return () => document.documentElement.classList.remove("motion-paused");
  }, [paused]);
  return (
    <>
      <footer className="footer">
        <div className="footer-top">
          <div>
            <Link href="/" aria-label="CorSentri home">
              <img
                src="/brand/white-logo.svg"
                width="200"
                height="45"
                alt="CorSentri"
              />
            </Link>
            <p>
              Smarter security.
              <br />
              Greater confidence.
            </p>
            <Link href="/free-risk-assessment">
              Request a free risk assessment ↗
            </Link>
          </div>
          <div>
            <span>Explore</span>
            {links
              .filter(([, href]) => href !== "/contact")
              .map(([name, href]) => (
                <Link key={href} href={href}>
                  {name}
                </Link>
              ))}
          </div>
          <div>
            <span>Get in touch</span>
            <Link href="/book-a-consultation">Book a consultation ↗</Link>
            <a href="mailto:contact@corsentri.com">contact@corsentri.com</a>
            <a href="tel:+19804094888">(980) 409-4888</a>
            <p>Charlotte, North Carolina</p>
            <Link href="/book-a-consultation">Book a consultation ↗</Link>
          </div>
          <div>
            <span>Stay connected</span>
            <a href="https://www.linkedin.com/company/corsentri/">LinkedIn ↗</a>
            <a href="https://www.instagram.com/corsentri/">Instagram ↗</a>
            <a href="https://x.com/corsentri">X ↗</a>
            <button
              className="footer-button"
              onClick={() => setPaused(!paused)}
              aria-pressed={paused}
            >
              {paused ? "Resume" : "Pause"} animations {paused ? "▷" : "Ⅱ"}
            </button>
            <a className="back-top" href="#">
              Back to top ↑
            </a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} CorSentri LLC</span>
          <span>Always watching. Always human.</span>
          <div>
            <Link href="/privacy-policy">Privacy</Link>
            <Link href="/terms-of-use">Terms</Link>
            <Link href="/cookie-policy">Cookies</Link>
            <button
              className="footer-button"
              onClick={() => settings.current?.showModal()}
            >
              Cookie settings
            </button>
          </div>
        </div>
      </footer>
      <dialog
        ref={settings}
        className="settings-dialog"
        aria-labelledby="settings-title"
      >
        <button
          className="dialog-close"
          onClick={() => settings.current?.close()}
          aria-label="Close cookie settings"
        >
          ×
        </button>
        <p className="eyebrow">Your privacy</p>
        <h2 id="settings-title">Cookie settings</h2>
        <p>
          This version of the site does not load Google Analytics or Microsoft
          Clarity.
        </p>
        <div className="setting-row">
          <div>
            <strong>Essential</strong>
            <p>Hosting and basic website functionality.</p>
          </div>
          <span>Always on</span>
        </div>
        <div className="setting-row">
          <div>
            <strong>Analytics</strong>
            <p>No analytics tools are installed.</p>
          </div>
          <span>Off</span>
        </div>
        <p>
          The Calendly calendar loads only when you choose to open it. Calendly
          manages its own cookies and privacy settings.
        </p>
        <button
          className="form-button"
          onClick={() => settings.current?.close()}
        >
          Done <Arrow />
        </button>
      </dialog>
    </>
  );
}
