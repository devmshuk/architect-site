// Shown on every French page. The French was produced by machine translation and has
// not been checked by a native speaker. Until it has been reviewed, say so plainly —
// architecture writing that reads awkwardly costs more credibility than it gains.
export default function TranslationNotice() {
  return (
    <div className="notice" role="note">
      <strong>Traduction à relire.</strong> Cette version française est une traduction
      automatique qui n&rsquo;a pas encore été relue par un locuteur natif. Elle peut
      contenir des tournures maladroites ou des termes techniques inexacts. En cas de
      doute, la <a href="/">version anglaise</a> fait référence.
    </div>
  );
}
