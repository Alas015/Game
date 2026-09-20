import { useState, useEffect } from 'react';
import type { HWFinding } from './hwTypes';
import { HW_CORRECT_ANSWER, HW_EVENTS, HW_CAUSES, HW_RESPONSIBLE } from './hwData';

interface HWResultScreenProps {
  finding: HWFinding;
  collectedClueIds: string[];
  onPlayAgain: () => void;
  onExit: () => void;
}

export default function HWResultScreen({ finding, collectedClueIds, onPlayAgain, onExit }: HWResultScreenProps) {
  const [phase, setPhase] = useState(0);

  const eventCorrect = finding.eventId === HW_CORRECT_ANSWER.eventId;
  const causeCorrect = finding.causeId === HW_CORRECT_ANSWER.causeId;
  const responsibleCorrect = finding.responsibleId === HW_CORRECT_ANSWER.responsibleId;
  const correctCount = [eventCorrect, causeCorrect, responsibleCorrect].filter(Boolean).length;

  const verdict = correctCount === 3 ? 'truth' : correctCount >= 2 ? 'partial' : 'buried';

  const VERDICTS = {
    truth: {
      label: 'THE TRUTH SURFACES',
      sublabel: 'Your finding matches what Ashwick Hollow tried to bury',
      color: '#8fd6ab',
      bgColor: 'rgba(90,173,126,0.12)',
    },
    partial: {
      label: 'AN UNFINISHED RECKONING',
      sublabel: 'Part of it is right. The rest, the village will use to muddy the water',
      color: '#c9a03c',
      bgColor: 'rgba(201,160,60,0.1)',
    },
    buried: {
      label: 'THE HOLLOW KEEPS ITS SECRETS',
      sublabel: 'What you carry out of these woods is not what actually happened',
      color: '#d97a6e',
      bgColor: 'rgba(180,60,50,0.1)',
    },
  } as const;

  const v = VERDICTS[verdict];

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 400),
      setTimeout(() => setPhase(2), 1300),
      setTimeout(() => setPhase(3), 2300),
      setTimeout(() => setPhase(4), 3300),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  const reportedEvent = HW_EVENTS.find(e => e.id === finding.eventId);
  const reportedCause = HW_CAUSES.find(c => c.id === finding.causeId);
  const reportedResponsible = HW_RESPONSIBLE.find(r => r.id === finding.responsibleId);
  const correctEvent = HW_EVENTS.find(e => e.id === HW_CORRECT_ANSWER.eventId);
  const correctCause = HW_CAUSES.find(c => c.id === HW_CORRECT_ANSWER.causeId);
  const correctResponsible = HW_RESPONSIBLE.find(r => r.id === HW_CORRECT_ANSWER.responsibleId);

  return (
    <div style={{ minHeight: '100vh', background: '#03090a', display: 'flex', flexDirection: 'column', fontFamily: "'IM Fell English', serif", position: 'relative' }}>
      <div style={{ position: 'fixed', inset: 0, background: `radial-gradient(ellipse at 50% 30%, ${v.bgColor} 0%, #03090a 65%)`, pointerEvents: 'none' }} />

      <div style={{ flex: 1, overflowY: 'auto', padding: '2rem', maxWidth: 820, width: '100%', margin: '0 auto', position: 'relative', zIndex: 2 }}>

        <div style={{ opacity: phase >= 1 ? 1 : 0, transition: 'opacity 0.7s ease', textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontFamily: "'Lora', serif", fontStyle: 'italic', fontSize: '0.52rem', color: 'rgba(180,200,190,0.3)', letterSpacing: '0.3em', marginBottom: '0.4rem' }}>
            YOUR LAST NIGHT IN ASHWICK HOLLOW
          </div>
          <div style={{ height: 1, background: `linear-gradient(90deg, transparent, ${v.color}40, transparent)` }} />
        </div>

        <div style={{ opacity: phase >= 2 ? 1 : 0, transform: phase >= 2 ? 'translateY(0)' : 'translateY(20px)', transition: 'opacity 0.8s ease, transform 0.8s ease', textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontFamily: "'IM Fell English', serif", fontSize: 'clamp(1.5rem, 5vw, 2.4rem)', color: v.color, letterSpacing: '0.02em', marginBottom: '0.5rem', textShadow: `0 0 40px ${v.color}55` }}>
            {v.label}
          </div>
          <div style={{ fontFamily: "'Lora', serif", fontStyle: 'italic', fontSize: '0.68rem', color: `${v.color}cc` }}>
            {v.sublabel}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginTop: '1rem' }}>
            {[0, 1, 2].map(i => (
              <div key={i} style={{ width: 28, height: 4, background: i < correctCount ? v.color : 'rgba(60,70,60,0.5)', transition: 'background 0.5s ease' }} />
            ))}
          </div>
          <div style={{ fontFamily: "'Lora', serif", fontSize: '0.5rem', color: `${v.color}99`, marginTop: '0.5rem', letterSpacing: '0.06em' }}>
            {correctCount}/3 findings match what really happened
          </div>
        </div>

        <div style={{ opacity: phase >= 3 ? 1 : 0, transform: phase >= 3 ? 'translateY(0)' : 'translateY(16px)', transition: 'opacity 0.8s ease 0.1s, transform 0.8s ease 0.1s', marginBottom: '1.5rem' }}>
          {[
            { label: 'What happened?', reported: reportedEvent?.label ?? '', correct: correctEvent?.label ?? '', isCorrect: eventCorrect },
            { label: 'Root cause?', reported: reportedCause?.label ?? '', correct: correctCause?.label ?? '', isCorrect: causeCorrect },
            { label: 'Responsible?', reported: reportedResponsible?.label ?? '', correct: correctResponsible?.label ?? '', isCorrect: responsibleCorrect },
          ].map(({ label, reported, correct, isCorrect }) => (
            <div key={label} style={{
              marginBottom: '0.8rem', padding: '0.9rem 1.1rem',
              background: isCorrect ? 'rgba(10,40,26,0.55)' : 'rgba(35,12,10,0.55)',
              border: isCorrect ? '1px solid rgba(90,173,126,0.22)' : '1px solid rgba(180,60,50,0.18)',
              borderLeft: isCorrect ? '2px solid rgba(90,173,126,0.6)' : '2px solid rgba(180,60,50,0.45)',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <div style={{ fontFamily: "'Lora', serif", fontSize: '0.48rem', color: 'rgba(180,200,190,0.4)', letterSpacing: '0.1em' }}>
                  {label.toUpperCase()}
                </div>
                <div style={{ fontFamily: "'Lora', serif", fontSize: '0.48rem', color: isCorrect ? '#8fd6ab' : '#d97a6e', letterSpacing: '0.1em', fontWeight: 700 }}>
                  {isCorrect ? '✓ MATCHES' : '✗ DOES NOT MATCH'}
                </div>
              </div>
              <div style={{ fontFamily: "'IM Fell English', serif", fontSize: '0.72rem', color: 'rgba(190,210,195,0.65)', lineHeight: 1.5, marginBottom: isCorrect ? 0 : '0.5rem' }}>
                You recorded: <span style={{ color: isCorrect ? 'rgba(143,214,171,0.85)' : 'rgba(220,140,130,0.75)' }}>{reported}</span>
              </div>
              {!isCorrect && (
                <div style={{ fontFamily: "'IM Fell English', serif", fontSize: '0.72rem', color: 'rgba(190,210,195,0.65)', lineHeight: 1.5 }}>
                  What actually happened: <span style={{ color: 'rgba(143,214,171,0.75)' }}>{correct}</span>
                </div>
              )}
            </div>
          ))}
        </div>

        <div style={{ opacity: phase >= 4 ? 1 : 0, transform: phase >= 4 ? 'translateY(0)' : 'translateY(12px)', transition: 'opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s', marginBottom: '2rem' }}>
          <div style={{ padding: '1.2rem 1.4rem', background: 'rgba(4,10,8,0.9)', border: '1px solid rgba(90,173,126,0.1)' }}>
            <div style={{ fontFamily: "'Lora', serif", fontSize: '0.48rem', color: 'rgba(90,173,126,0.45)', letterSpacing: '0.2em', marginBottom: '0.8rem' }}>
              ▸ WHAT REALLY HAPPENED IN ASHWICK HOLLOW
            </div>

            <p style={{ fontFamily: "'IM Fell English', serif", fontSize: '0.85rem', lineHeight: 1.95, color: 'rgba(190,210,195,0.68)', marginBottom: '0.8rem' }}>
              The wood never needed anyone. Two centuries ago, a story was told to explain a hard winter and a hungry
              village, and somewhere in the generations since, the men who ran Ashwick Hollow noticed that a story
              about a hungry wood could also explain away a debt, a complaint, or a threat to leave — provided no one
              ever looked too closely at who the wood seemed to want.
            </p>

            <p style={{ fontFamily: "'IM Fell English', serif", fontSize: '0.85rem', lineHeight: 1.95, color: 'rgba(190,210,195,0.68)', marginBottom: '0.8rem' }}>
              The Council chose the names. Hollis Briggs settled the mill's debts through them, paying grieving
              families to leave quietly and never ask what "the wood's due" truly meant. Constable Rennick closed
              every case the same way and never once walked the ground to check. Nan Weaver told the old story exactly
              as she'd been taught, and placed whatever "offerings" the Council handed her into a box she was never
              permitted to open — the last honest link in a chain built entirely on people not asking questions.
            </p>

            <p style={{ fontFamily: "'IM Fell English', serif", fontSize: '0.85rem', lineHeight: 1.95, color: 'rgba(190,210,195,0.68)', marginBottom: '0.8rem' }}>
              Mara Thorne broke that chain by accident, finding a torn ledger page that never should have blown loose.
              When she took her question to her own grandfather instead of letting it go, she became exactly the kind
              of inconvenient the Due had always been built to remove — and this time, the Council did not wait for
              an autumn ceremony to decide.
            </p>

            <p style={{ fontFamily: "'IM Fell English', serif", fontSize: '0.85rem', lineHeight: 1.95, color: 'rgba(190,210,195,0.68)', marginBottom: '0.8rem' }}>
              Josiah Thorne had signed his name to forty years of this without once asking what it cost. It took his
              own granddaughter's name on the list to make him finally write to the county assizes — a letter he never
              sent, because the same silence that had protected the Council for two centuries closed over him before
              he could reach the road.
            </p>

            <div style={{ marginTop: '0.8rem', paddingTop: '0.8rem', borderTop: '1px solid rgba(90,173,126,0.08)', fontFamily: "'IM Fell English', serif", fontSize: '0.78rem', color: '#8fd6ab', lineHeight: 1.75 }}>
              Where Mara and Josiah are now — the Deep Cuts, somewhere further into the wood, or somewhere the Council
              simply doesn't intend for anyone to find — is a question Ashwick Hollow will not answer for you, and one
              this investigation was never going to close on its own. The Due Stone still stands on the green. It is
              due to be read again this autumn.
            </div>
          </div>
        </div>

        <div style={{ opacity: phase >= 4 ? 1 : 0, transition: 'opacity 0.7s ease 0.35s', display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            {[
              { label: 'Evidence', value: `${collectedClueIds.length}/7` },
              { label: 'Findings', value: `${correctCount}/3` },
              { label: 'Verdict', value: verdict === 'truth' ? 'SURFACED' : verdict === 'partial' ? 'PARTIAL' : 'BURIED' },
            ].map(({ label, value }) => (
              <div key={label} style={{ flex: '1 1 140px', textAlign: 'center', padding: '0.8rem', background: 'rgba(4,10,8,0.8)', border: '1px solid rgba(90,173,126,0.1)' }}>
                <div style={{ fontFamily: "'Lora', serif", fontSize: '0.45rem', color: 'rgba(90,173,126,0.4)', letterSpacing: '0.12em', marginBottom: '0.3rem' }}>
                  {label}
                </div>
                <div style={{ fontFamily: "'IM Fell English', serif", fontSize: '1.05rem', color: v.color }}>
                  {value}
                </div>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '0.8rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={onPlayAgain}
              style={{ fontFamily: "'IM Fell English', serif", fontSize: '0.82rem', background: 'rgba(90,173,126,0.06)', border: '1px solid rgba(90,173,126,0.4)', color: '#8fd6ab', padding: '0.75em 2.1em', cursor: 'pointer', transition: 'all 0.25s ease' }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(90,173,126,0.14)'; (e.currentTarget as HTMLElement).style.boxShadow = '0 0 20px rgba(90,173,126,0.15)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(90,173,126,0.06)'; (e.currentTarget as HTMLElement).style.boxShadow = 'none'; }}
            >
              Walk the Wood Again
            </button>
            <button
              onClick={onExit}
              style={{ fontFamily: "'Lora', serif", fontStyle: 'italic', fontSize: '0.75rem', background: 'transparent', border: '1px solid rgba(180,200,190,0.2)', color: 'rgba(180,200,190,0.45)', padding: '0.75em 1.7em', cursor: 'pointer', transition: 'all 0.25s ease' }}
            >
              ← Return to the Archive
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
