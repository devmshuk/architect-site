export const metadata = { title: 'Contact — Dev Mani Shukla' };

const channels = [
  ['EMAIL', 'devmanis.757@gmail.com', 'mailto:devmanis.757@gmail.com'],
  ['LINKEDIN', 'linkedin.com/in/dev-mani-shukla', 'https://www.linkedin.com/in/dev-mani-shukla'],
  ['PHONE', '+91 98992 10128', 'tel:+919899210128'],
  ['LOCATION', 'Gurgaon, India · remote-friendly', null],
];

export default function Contact() {
  return (
    <section>
      <p className="eyebrow">CONTACT</p>
      <h1>Happy to talk through a hard architecture problem.</h1>
      <p className="sub">If you&rsquo;re weighing an architecture decision, scaling a commerce platform, or building a team to do it — I&rsquo;m glad to think it through with you. No pitch, no agenda.</p>
      <div className="grid" style={{ marginTop: 24 }}>
        {channels.map(([label, value, href]) => {
          const inner = (
            <>
              <span className="tag">{label}</span>
              <div style={{ fontWeight: 600, marginTop: 8 }}>{value}</div>
            </>
          );
          return href
            ? <a className="card" key={label} href={href} target="_blank" rel="noopener">{inner}</a>
            : <div className="card" key={label}>{inner}</div>;
        })}
      </div>
    </section>
  );
}
