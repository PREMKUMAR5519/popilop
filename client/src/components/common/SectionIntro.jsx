export default function SectionIntro({ eyebrow, title, description, actions }) {
  return (
    <div className="c_section-intro">
      <div>
        {eyebrow ? <p className="c_eyebrow">{eyebrow}</p> : null}
        <h2>{title}</h2>
        {description ? <p>{description}</p> : null}
      </div>
      {actions ? <div className="c_section-intro__actions">{actions}</div> : null}
    </div>
  );
}

