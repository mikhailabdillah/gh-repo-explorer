import React, { FC, ReactNode, useState, useCallback } from 'react'
import cn from 'clsx'
import s from './Collapse.module.css'
import { ChevronRight } from '../../icons'
import { useSpring, a } from '@react-spring/web'
import useMeasure from 'react-use-measure'

export interface CollapseProps {
  title: string
  children?: ReactNode
}

const Collapse: FC<CollapseProps> = ({ title, children }) => {
  const [isActive, setActive] = useState(false)
  const [ref, { height: viewHeight }] = useMeasure()

  const animProps = useSpring({
    height: isActive ? viewHeight : 0,
    config: { tension: 250, friction: 32, clamp: true, duration: 150 },
    opacity: isActive ? 1 : 0,
  })

  const toggle = useCallback(() => setActive((x) => !x), [])

  return (
    <>
      <div
        className={s.root}
        role='button'
        tabIndex={0}
        aria-expanded={isActive}
        onClick={toggle}
      >
        <div className={s.header}>
          <ChevronRight className={cn(s.icon, { [s.open]: isActive })} />
          <span className={s.label}>{title}</span>
        </div>
      </div>
      <a.div style={{ overflow: 'hidden', ...animProps }}>
        <div ref={ref} className={s.content}>
          {children}
        </div>
      </a.div>
    </>
  )
}

export default React.memo(Collapse)
