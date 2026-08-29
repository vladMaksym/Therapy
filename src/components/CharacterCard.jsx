export default function CharacterCard({ profile }) {
  return (
    <article className="character-card">
      <div className="avatar-ring">
        <div className="avatar-icon">{profile.name.charAt(0)}</div>
      </div>
      <div className="character-copy">
        <p className="eyebrow">Profile</p>
        <h3>{profile.name}</h3>
        <span>{profile.role}</span>
        <p>{profile.intro}</p>
      </div>
    </article>
  );
}
