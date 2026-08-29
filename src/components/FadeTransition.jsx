export default function FadeTransition({ children, keyName }) {
  return <div className="fade-transition" key={keyName}>{children}</div>;
}
