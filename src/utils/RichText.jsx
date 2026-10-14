export function renderRichText(text) {
  return String(text)
    .split(/\*\*(.+?)\*\*/g)
    .map((part, i) =>
      i % 2 === 1 ? (
        <span key={i} className="font-semibold text-[#67AE6E]">
          {part}
        </span>
      ) : (
        part
      ),
    );
}
