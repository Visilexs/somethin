import { TypewriterText } from './StoryAnim'
import { useState } from 'react'
import { Reveal } from './UI'

function LawItem({ law, expanded, onToggle }) {
  return (
    <div className="law-item">
      <div
        className="law-hdr"
        onClick={onToggle}
        role="button"
        tabIndex={0}
        onKeyDown={e => e.key === 'Enter' && onToggle()}
      >
        <div className="law-roman">{law.roman}</div>
        <div className="law-name">{law.title}</div>
        <div className={`law-chev ${expanded ? 'open' : ''}`}>▼</div>
      </div>
      <div className={`law-body ${expanded ? 'open' : 'closed'}`}>
        <div className="law-inner">
          <div className="law-content">
            <div className="law-text" dangerouslySetInnerHTML={{ __html: law.body }} />
            {law.note && (
              <div className="law-note">Council of Devín — {law.note}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function LawGroup({ group }) {
  const [expanded, setExpanded] = useState(null)
  const toggle = (i) => setExpanded(expanded === i ? null : i)

  return (
    <Reveal>
      <div className="law-group" id={group.id}>
        <div className="law-group-header">
          <div className="law-group-label">Čudové Zákony · {group.label}</div>
          <div className="law-group-title"><TypewriterText text={group.subtitle} speed={18}/></div>
        </div>
        {group.laws.map((law, i) => (
          <LawItem
            key={i}
            law={law}
            expanded={expanded === i}
            onToggle={() => toggle(i)}
          />
        ))}
      </div>
    </Reveal>
  )
}
