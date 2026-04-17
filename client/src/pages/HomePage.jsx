import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import SectionIntro from '../components/common/SectionIntro';
import { features, marketingStats, pricingPlans } from '../data/siteContent';

const featureIcons = ['⚡', '💬', '🗓', '🛍'];

const socialProofItems = [
  'Digital educators',
  'Template sellers',
  'Course creators',
  'Brand strategists',
  'Personal trainers',
  'Musicians',
  'Artists & illustrators',
  'Coaches',
  'Podcasters',
  'Photographers',
];

export default function HomePage() {
  // Scroll-reveal via IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) entry.target.classList.add('is-visible');
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -48px 0px' }
    );
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Stat number counter animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting || entry.target.dataset.animated) return;
          entry.target.dataset.animated = 'true';
          const raw = entry.target.dataset.count;
          const end = parseFloat(raw.replace(/[^0-9.]/g, ''));
          const prefix = raw.startsWith('$') ? '$' : '';
          const suffix = raw.replace(/[$0-9.]/g, '');
          const dur = 1600;
          const t0 = performance.now();
          const tick = now => {
            const p = Math.min((now - t0) / dur, 1);
            const val = (1 - Math.pow(1 - p, 3)) * end;
            entry.target.textContent =
              prefix + (end % 1 !== 0 ? val.toFixed(1) : Math.floor(val)) + suffix;
            if (p < 1) requestAnimationFrame(tick);
            else entry.target.textContent = raw;
          };
          requestAnimationFrame(tick);
        });
      },
      { threshold: 0.8 }
    );
    document.querySelectorAll('[data-count]').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="p_home">

      {/* ── Hero (full-bleed) ─────────────────────────────── */}
      <section className="p_home__hero">
        <div className="p_home__hero-copy">
          <span className="c_badge c_badge--accent anim-hero" style={{ '--d': '0ms' }}>
            Creator commerce · CRM · Automation
          </span>
          <h1 className="anim-hero" style={{ '--d': '80ms' }}>
            Build the creator page that actually{' '}
            <em className="p_home__hero-em">converts.</em>
          </h1>
          <p className="anim-hero" style={{ '--d': '160ms' }}>
            Halo Studio combines premium landing pages, Instagram CRM, product sales,
            scheduler workflows, and comment-trigger automations in one deploy-ready system.
          </p>
          <div className="p_home__hero-actions anim-hero" style={{ '--d': '240ms' }}>
            <Link to="/signup"><Button>Launch your page</Button></Link>
            <Link to="/login"><Button variant="ghost">Open dashboard</Button></Link>
          </div>
          <div className="p_home__stat-strip anim-hero" style={{ '--d': '320ms' }}>
            {marketingStats.map(stat => (
              <div key={stat.label}>
                <strong data-count={stat.value}>{stat.value}</strong>
                <span>{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="p_home__hero-panel anim-slide-in">
          <Card className="p_mockup p_mockup--device">
            <div className="p_mockup__header">
              <span /><span /><span />
            </div>
            <div className="p_mockup__creator-card">
              <div className="p_mockup__avatar">OS</div>
              <div>
                <strong>Creator workspace</strong>
                <p>Growth strategist · products · DM funnels</p>
              </div>
            </div>
            <div className="p_mockup__tiles">
              <div className="p_mockup__tile p_mockup__tile--primary">Featured offer</div>
              <div className="p_mockup__tile">CRM capture</div>
              <div className="p_mockup__tile">Storefront</div>
              <div className="p_mockup__tile">Affiliate picks</div>
            </div>
          </Card>
          <Card className="p_home__floating-note">
            <p className="c_overline">Automation ready</p>
            <h3>Comment &ldquo;price&rdquo; → DM sequence</h3>
            <p>Integration-ready provider architecture with safe placeholders for real Meta permissions.</p>
          </Card>
        </div>
      </section>

      {/* ── Marquee ticker (full-bleed) ───────────────────── */}
      <div className="p_home__marquee-outer" aria-hidden="true">
        <div className="p_home__marquee-track">
          {[...socialProofItems, ...socialProofItems].map((item, i) => (
            <span key={i} className="p_home__marquee-item">{item}</span>
          ))}
        </div>
      </div>

      {/* ── Platform features (full-bleed section) ────────── */}
      <section className="p_home__section">
        <div className="reveal">
          <SectionIntro
            eyebrow="Platform"
            title="A premium creator operating system"
            description="Built for the way creators actually sell: from profile traffic to lead capture, product delivery, and follow-up."
          />
        </div>
        <div className="l_grid l_grid--4">
          {features.map((feature, i) => (
            <Card
              key={feature.title}
              className="p_home__feature-card reveal"
              style={{ '--d': `${i * 90}ms` }}
            >
              <span className="p_home__feature-icon" aria-hidden="true">
                {featureIcons[i]}
              </span>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* ── Why it converts (alt background) ─────────────── */}
      <section className="p_home__section p_home__section--soft">
        <div className="reveal">
          <SectionIntro
            eyebrow="Why it converts"
            title="Smarter than a simple link-in-bio"
            description="Creators can stack a hero offer, social proof, products, lead forms, FAQs, and mobile sticky CTAs into one adaptive profile page."
          />
        </div>
        <div className="l_grid l_grid--2">
          <Card className="p_home__convert-card reveal" style={{ '--d': '0ms' }}>
            <h3>Conversion-first modules</h3>
            <p>Profile blocks, testimonials, affiliate shelves, gallery sections, and email capture live inside a reusable block architecture.</p>
          </Card>
          <Card className="p_home__convert-card reveal" style={{ '--d': '90ms' }}>
            <h3>One dashboard for everything</h3>
            <p>Landing edits, CRM, post scheduling, products, analytics, automations, settings, and media library all share one system.</p>
          </Card>
        </div>
      </section>

      {/* ── Pricing ───────────────────────────────────────── */}
      <section className="p_home__section">
        <div className="reveal">
          <SectionIntro eyebrow="Pricing" title="Simple plans for creators at every stage" />
        </div>
        <div className="l_grid l_grid--3">
          {pricingPlans.map((plan, i) => (
            <Card
              key={plan.name}
              className={`reveal ${plan.featured ? 'c_card--featured p_home__plan--featured' : ''}`}
              style={{ '--d': `${i * 110}ms` }}
            >
              <p className="c_overline">{plan.name}</p>
              <div className="p_home__plan-price">
                <strong>{plan.price}</strong>
                <span>/mo</span>
              </div>
              <p>{plan.summary}</p>
              <ul className="c_feature-list">
                {plan.features.map(f => <li key={f}>{f}</li>)}
              </ul>
              <Button variant={plan.featured ? 'primary' : 'secondary'}>
                {plan.featured ? 'Start growth' : 'Choose plan'}
              </Button>
            </Card>
          ))}
        </div>
      </section>

      {/* ── FAQ (alt background) ──────────────────────────── */}
      <section className="p_home__section p_home__section--soft">
        <div className="reveal">
          <SectionIntro eyebrow="FAQ" title="Built for real production handoff" />
        </div>
        <div className="l_grid l_grid--2">
          <Card className="reveal" style={{ '--d': '0ms' }}>
            <h3>Does this fake Instagram publishing?</h3>
            <p>No. The app does not synthesize publishing success. Missing Meta configuration or permissions return explicit backend errors.</p>
          </Card>
          <Card className="reveal" style={{ '--d': '90ms' }}>
            <h3>Can I deploy this cleanly?</h3>
            <p>Yes. The project ships with separate client and server apps, env templates, Mongo models, upload abstraction, and production-oriented route structure.</p>
          </Card>
        </div>
      </section>

      {/* ── Footer CTA (full-bleed) ───────────────────────── */}
      <section className="p_home__footer-cta reveal">
        <div className="p_home__footer-cta-copy">
          <p className="c_eyebrow">Start building</p>
          <h2>Launch a premium creator page, store, and CRM in one stack.</h2>
        </div>
        <Link to="/signup">
          <Button>Start free</Button>
        </Link>
      </section>

    </div>
  );
}
