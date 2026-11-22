// Plain-language explanations of the ideas a viva is likely to ask about.
const notes = [
  {
    term: "include",
    text: "include copies another PHP file into this one at that exact spot. It is how header.php, footer.php and menu-data.php are reused on every page instead of being pasted five times.",
  },
  {
    term: "foreach",
    text: "foreach walks through an array one item at a time. menu.php uses it to print all 30 dish cards, and index.php uses it to pick the three Chef's Special dishes.",
  },
  {
    term: "$_POST",
    text: "When a form uses method=\"POST\", PHP puts the submitted fields in the $_POST array. reservation.php reads $_POST['name'], $_POST['phone'] and so on, then checks them again on the server.",
  },
  {
    term: "$_SERVER['REQUEST_METHOD']",
    text: "Tells you how the page was requested. If it equals POST, the form was submitted; if it is GET, the visitor just opened the page.",
  },
  {
    term: "htmlspecialchars() and trim()",
    text: "trim() removes spaces from both ends of the input. htmlspecialchars() turns < and > into safe entities so anything a visitor types can never run as HTML on the page.",
  },
  {
    term: "filter_var()",
    text: "PHP's built-in validator. filter_var($email, FILTER_VALIDATE_EMAIL) returns the email if it is valid, or false if it is not.",
  },
  {
    term: "number_format()",
    text: "Formats a number with thousands separators, so 480 prints as 480 and 1200 would print as 1,200. Used for every price.",
  },
  {
    term: "file_put_contents()",
    text: "Writes text to a file. With FILE_APPEND it adds to the end instead of overwriting, and LOCK_EX stops two visitors writing at the same moment.",
  },
  {
    term: "DOM manipulation",
    text: "JavaScript reads the page with getElementById and querySelectorAll, then changes it with classList, textContent and createElement + appendChild. That is how the filters hide cards without reloading.",
  },
  {
    term: "localStorage",
    text: "A small store in the browser that survives reloads. The cart is saved as JSON text with JSON.stringify, and read back with JSON.parse.",
  },
  {
    term: "Event delegation",
    text: "Instead of adding a click listener to every + and - button, one listener on the cart list checks which button was clicked using event.target.closest('button').",
  },
  {
    term: "IntersectionObserver",
    text: "Watches when an element scrolls into view. The .fade-in blocks get the .visible class the first time they appear, which triggers the CSS fade.",
  },
];

export default function VivaNotes() {
  return (
    <section className="mx-auto max-w-6xl px-6 pb-20">
      <div className="rounded-3xl border border-border bg-card p-8 md:p-10">
        <p className="text-[0.65rem] uppercase tracking-[0.35em] text-primary">Viva notes</p>
        <h2 className="mt-3 font-heading text-2xl font-semibold md:text-3xl">
          What each idea does, in one line
        </h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {notes.map((note) => (
            <div key={note.term}>
              <h3 className="font-mono text-sm font-semibold text-primary">{note.term}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{note.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}