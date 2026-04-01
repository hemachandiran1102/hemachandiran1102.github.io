import './GridBackground.css'

export default function GridBackground() {
  return (
    <div className="grid-bg">
      <div className="grid-bg__pattern" />
      <div className="grid-bg__gradient-top" />
      <div className="grid-bg__gradient-bottom" />
      <div className="grid-bg__orb grid-bg__orb--1" />
      <div className="grid-bg__orb grid-bg__orb--2" />
      <div className="grid-bg__orb grid-bg__orb--3" />
    </div>
  )
}
