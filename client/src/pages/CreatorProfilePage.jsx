import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import EmptyState from '../components/common/EmptyState';
import { creatorApi } from '../api/appApi';
import { useAsyncData } from '../hooks/useAsyncData';
import { formatCurrency } from '../utils/format';

const PUBLIC_THEMES = {
  aurora: {
    bg: '#fff6f3',
    surface: '#ffffff',
    surfaceSoft: '#fffaf7',
    accent: '#ff6b57',
    accentText: '#ffffff',
    text: '#1a1210',
    textSoft: '#7e655f',
    border: 'rgba(255,107,87,0.16)',
    header: 'linear-gradient(160deg,#fff7f4 0%,#ffe3db 100%)'
  },
  canvas: {
    bg: '#f7faff',
    surface: '#ffffff',
    surfaceSoft: '#f1f6ff',
    accent: '#1f7aff',
    accentText: '#ffffff',
    text: '#102033',
    textSoft: '#617189',
    border: 'rgba(31,122,255,0.14)',
    header: 'linear-gradient(160deg,#f5f9ff 0%,#deebff 100%)'
  },
  muse: {
    bg: '#f5fbf8',
    surface: '#ffffff',
    surfaceSoft: '#eef8f3',
    accent: '#0ea67f',
    accentText: '#ffffff',
    text: '#0f231b',
    textSoft: '#567463',
    border: 'rgba(14,166,127,0.14)',
    header: 'linear-gradient(160deg,#f3fbf7 0%,#d7f0e5 100%)'
  },
  midnight: {
    bg: '#111318',
    surface: '#1b1f28',
    surfaceSoft: '#222733',
    accent: '#7c6ef5',
    accentText: '#ffffff',
    text: '#f2f4f8',
    textSoft: '#a1a7bb',
    border: 'rgba(124,110,245,0.24)',
    header: 'linear-gradient(160deg,#222636 0%,#12151b 100%)'
  },
  minimal: {
    bg: '#f6f6f4',
    surface: '#ffffff',
    surfaceSoft: '#f1f1ee',
    accent: '#111111',
    accentText: '#ffffff',
    text: '#111111',
    textSoft: '#666666',
    border: 'rgba(17,17,17,0.1)',
    header: 'linear-gradient(160deg,#fcfcfb 0%,#efefeb 100%)'
  }
};

function getInitials(name = 'CR') {
  return name
    .split(' ')
    .map(part => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

function normalizePublicPage(page, index, fallbackName) {
  return {
    id: page?.id || `page-${index + 1}`,
    name: page?.name || fallbackName,
    theme: page?.theme || 'aurora',
    meta: page?.meta || {},
    blocks: Array.isArray(page?.blocks) ? page.blocks.filter(block => block?.isVisible !== false) : []
  };
}

function buildPublicPages(landingPage, profile) {
  if (Array.isArray(landingPage?.pages) && landingPage.pages.length) {
    return landingPage.pages.map((page, index) =>
      normalizePublicPage(page, index, page?.name || `Page ${index + 1}`)
    );
  }

  return [
    normalizePublicPage(
      {
        id: landingPage?._id || 'page-main',
        name: landingPage?.title || 'My Page',
        theme: landingPage?.themePreset || 'aurora',
        meta: {
          metaDescription: landingPage?.metaDescription || ''
        },
        blocks: landingPage?.blocks || []
      },
      0,
      profile?.displayName || 'My Page'
    )
  ];
}

function PublicProfileBlock({ block, profile, theme }) {
  const displayName = block?.content?.name || profile.displayName;
  const bio = block?.content?.bio || profile.bio || 'This creator has not added a bio yet.';
  const avatar = block?.content?.avatar || profile.avatar;

  return (
    <section className="p_public-page__hero-card" style={{ background: theme.header, borderColor: theme.border }}>
      <div className="p_public-page__hero-top">
        {avatar ? (
          <img src={avatar} alt={displayName} className="p_public-page__avatar" />
        ) : (
          <div className="p_public-page__avatar p_public-page__avatar--fallback" style={{ background: theme.accent, color: theme.accentText }}>
            {getInitials(displayName)}
          </div>
        )}
        <div className="p_public-page__hero-copy">
          <h1 style={{ color: theme.text }}>{displayName}</h1>
          <p style={{ color: theme.textSoft }}>{bio}</p>
        </div>
      </div>
    </section>
  );
}

function PublicBlock({ block, profile, products, affiliateLinks, theme }) {
  switch (block.type) {
    case 'profile':
      return <PublicProfileBlock block={block} profile={profile} theme={theme} />;

    case 'banner':
      return (
        <section className="p_public-page__banner" style={{ background: theme.accent, color: theme.accentText }}>
          <div>
            <strong>{block.content?.message || 'Featured update'}</strong>
            <span>{profile.displayName}</span>
          </div>
          {block.content?.link ? (
            <a href={block.content.link} target="_blank" rel="noreferrer" style={{ color: theme.text }}>
              Open
            </a>
          ) : null}
        </section>
      );

    case 'links':
      return (
        <section className="p_public-page__section">
          <div className="p_public-page__button-list">
            {(block.content?.items || []).map(item => (
              <a
                key={item.id || item.title}
                className="p_public-page__link-button"
                href={item.url || '#'}
                target="_blank"
                rel="noreferrer"
                style={{ background: theme.surface, color: theme.text, borderColor: theme.border }}
              >
                <strong>{item.title || 'Untitled link'}</strong>
                <span>{item.url || 'Add a destination URL'}</span>
              </a>
            ))}
          </div>
        </section>
      );

    case 'social-links':
      return (
        <section className="p_public-page__section">
          <div className="p_public-page__socials">
            {(block.content?.items || []).map(item => (
              <a
                key={item.id || item.platform}
                className="p_public-page__social-pill"
                href={item.url || '#'}
                target="_blank"
                rel="noreferrer"
                style={{ background: theme.surface, color: theme.text, borderColor: theme.border }}
              >
                {item.platform || 'social'}
              </a>
            ))}
          </div>
        </section>
      );

    case 'email-capture':
      return (
        <section className="p_public-page__card" style={{ background: theme.surface, borderColor: theme.border }}>
          <div className="p_public-page__card-copy">
            <h3 style={{ color: theme.text }}>{block.content?.title || 'Join my newsletter'}</h3>
            <p style={{ color: theme.textSoft }}>{block.content?.description || 'Get updates, launches, and new work in your inbox.'}</p>
          </div>
          <form className="p_public-page__email-form">
            <input
              className="p_public-page__input"
              placeholder={block.content?.placeholder || 'your@email.com'}
              style={{ background: theme.surfaceSoft, color: theme.text, borderColor: theme.border }}
            />
            <button type="button" className="p_public-page__cta" style={{ background: theme.accent, color: theme.accentText }}>
              {block.content?.buttonLabel || 'Subscribe'}
            </button>
          </form>
        </section>
      );

    case 'featured-products':
      return (
        <section className="p_public-page__section">
          {products.length ? (
            <div className="p_public-page__product-grid">
              {products.map(product => (
                <Card key={product._id} className="c_product-card">
                  {product.thumbnail ? <img src={product.thumbnail} alt={product.title} /> : null}
                  <div className="c_product-card__body">
                    <p className="c_overline">{product.category}</p>
                    <h3>{product.title}</h3>
                    <p>{product.description}</p>
                    <div className="c_product-card__footer">
                      <strong>{formatCurrency(product.price)}</strong>
                      <Link to={`/product/${product.slug}`}>View</Link>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <section className="p_public-page__card" style={{ background: theme.surface, borderColor: theme.border }}>
              <p style={{ color: theme.textSoft }}>No featured products are published yet.</p>
            </section>
          )}
        </section>
      );

    case 'affiliate-links':
      return (
        <section className="p_public-page__card" style={{ background: theme.surface, borderColor: theme.border }}>
          <div className="p_public-page__card-copy">
            <h3 style={{ color: theme.text }}>Recommended tools</h3>
          </div>
          <div className="p_public-page__affiliate-list">
            {affiliateLinks.map(item => (
              <div key={item._id} className="p_public-page__affiliate-row">
                <div>
                  <strong style={{ color: theme.text }}>{item.title}</strong>
                  <span style={{ color: theme.textSoft }}>{item.commissionLabel || item.category}</span>
                </div>
                <span className="p_public-page__affiliate-badge" style={{ background: theme.surfaceSoft, color: theme.text }}>
                  {item.category}
                </span>
              </div>
            ))}
            {!affiliateLinks.length ? <p style={{ color: theme.textSoft }}>No affiliate links published yet.</p> : null}
          </div>
        </section>
      );

    default:
      return null;
  }
}

export default function CreatorProfilePage() {
  const { slug } = useParams();
  const { data, loading } = useAsyncData(() => creatorApi.publicCreator(slug), [slug]);
  const profile = data?.profile;
  const landingPage = data?.landingPage;
  const products = data?.products || [];
  const affiliateLinks = data?.affiliateLinks || [];

  const portfolioPages = useMemo(() => buildPublicPages(landingPage, profile), [landingPage, profile]);
  const defaultPageId = useMemo(
    () => portfolioPages.find(page => page.id === landingPage?.selectedPageId)?.id || portfolioPages[0]?.id || null,
    [portfolioPages, landingPage]
  );
  const [activePageId, setActivePageId] = useState(defaultPageId);

  useEffect(() => {
    setActivePageId(defaultPageId);
  }, [defaultPageId]);

  if (loading) {
    return <div className="l_page">Loading creator page...</div>;
  }

  if (!profile) {
    return <EmptyState title="Creator not found" description="This public creator profile does not exist." />;
  }

  const activePage = portfolioPages.find(page => page.id === activePageId) || portfolioPages[0];
  const theme = PUBLIC_THEMES[activePage?.theme] || PUBLIC_THEMES.aurora;
  const activeBlocks = activePage?.blocks || [];
  const hasProfileBlock = activeBlocks.some(block => block.type === 'profile');
  const portfolioUrl = `${window.location.origin}/${profile.slug}`;

  return (
    <div
      className="p_public-page"
      style={{
        background: theme.bg,
        '--page-text': theme.text,
        '--page-text-soft': theme.textSoft
      }}
    >
      <div className="p_public-page__shell">
        <div className="p_public-page__topbar">
          <div className="p_public-page__identity">
            <strong style={{ color: theme.text }}>{profile.displayName}</strong>
            <span style={{ color: theme.textSoft }}>{portfolioUrl}</span>
          </div>
          <Button type="button" variant="ghost" onClick={() => window.open(portfolioUrl, '_blank', 'noopener,noreferrer')}>
            Share
          </Button>
        </div>

        {portfolioPages.length > 1 ? (
          <div className="p_public-page__tabs">
            {portfolioPages.map(page => (
              <button
                key={page.id}
                type="button"
                className={`p_public-page__tab${page.id === activePage?.id ? ' p_public-page__tab--active' : ''}`}
                onClick={() => setActivePageId(page.id)}
                style={
                  page.id === activePage?.id
                    ? { background: theme.accent, color: theme.accentText, borderColor: theme.accent }
                    : { background: theme.surface, color: theme.text, borderColor: theme.border }
                }
              >
                {page.name}
              </button>
            ))}
          </div>
        ) : null}

        <div className="p_public-page__canvas">
          {!hasProfileBlock ? <PublicProfileBlock profile={profile} theme={theme} /> : null}

          {activeBlocks.map(block => (
            <PublicBlock
              key={block._id || `${activePage.id}-${block.type}`}
              block={block}
              profile={profile}
              products={products}
              affiliateLinks={affiliateLinks}
              theme={theme}
            />
          ))}

          {!activeBlocks.length ? (
            <section className="p_public-page__card" style={{ background: theme.surface, borderColor: theme.border }}>
              <p style={{ color: theme.textSoft }}>This page has not been designed yet.</p>
            </section>
          ) : null}
        </div>
      </div>
    </div>
  );
}
