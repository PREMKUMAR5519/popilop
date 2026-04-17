import Card from '../components/common/Card';
import SectionIntro from '../components/common/SectionIntro';
import { features } from '../data/siteContent';

export default function FeaturesPage() {
  return (
    <div className="l_page">
      <section className="l_section">
        <SectionIntro
          eyebrow="Features"
          title="Purpose-built for creator growth and commerce"
          description="A full-stack creator platform covering profile conversion, audience management, scheduling, automation, storefronts, and analytics."
        />
        <div className="l_grid l_grid--2">
          {features.map(feature => (
            <Card key={feature.title}>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </Card>
          ))}
          <Card>
            <h3>Cloudflare R2 asset delivery</h3>
            <p>Upload-ready storage abstraction for digital downloads, product galleries, and media library organization.</p>
          </Card>
          <Card>
            <h3>Admin-ready structure</h3>
            <p>Role support, user listings, moderation surfaces, and platform analytics structure are included from day one.</p>
          </Card>
        </div>
      </section>
    </div>
  );
}
