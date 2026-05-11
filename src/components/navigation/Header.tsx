import { SideNav } from "./SideNav";

type HeaderProps = {
  section: string;
  title: string;
};

export function Header({ section: _section, title: _title }: HeaderProps) {
  return (
    <header className="topbar">
      <div className="topbar-inner">
        <a className="brand brand-inline" href="/">
          <span className="brand-mark">E</span>
          <span className="brand-copy">
            <strong>教程</strong>
          </span>
        </a>

        <SideNav />

        <div className="topbar-actions">
          <a className="topbar-button topbar-button-primary" href="/apps/cc-switch">
            快速开始
          </a>
        </div>
      </div>
    </header>
  );
}
