import Card from '../components/common/Card';
import Button from '../components/common/Button';
import { pricingPlans } from '../data/siteContent';

export default function PricingPage() {
  return (
    <div className="l_page">
      <section className="l_section l_section--narrow">
        <div className="c_section-intro c_section-intro--center">
          <div>
            <p className="c_eyebrow">Pricing</p>
            <h2>Plans that scale from solo launches to studio operations</h2>
            <p>Every plan includes the premium landing page builder and deploy-ready product architecture.</p>
          </div>
        </div>
        <div className="l_grid l_grid--3">
          {pricingPlans.map(plan => (
            <Card key={plan.name} className={plan.featured ? 'c_card--featured' : ''}>
              <p className="c_overline">{plan.name}</p>
              <h3>{plan.price}</h3>
              <p>{plan.summary}</p>
              <ul className="c_feature-list">
                {plan.features.map(feature => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
              <Button>{plan.featured ? 'Choose growth' : 'Get started'}</Button>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
