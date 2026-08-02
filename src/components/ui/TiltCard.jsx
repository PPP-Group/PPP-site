import { useRef } from 'react';
import { useTilt } from '../../hooks/useMotionPrimitives';
import { useFinePointer, useReducedMotion } from '../../hooks/useMediaQuery';

/**
 * Card com inclinação 3D no ponteiro.
 *
 * Desliga em toque (não há ponteiro para seguir) e em movimento reduzido.
 * O brilho que acompanha a mão vem das variáveis `--tilt-px/--tilt-py`
 * escritas pelo hook.
 */
export function TiltCard({ as: Tag = 'div', className = '', children, ...rest }) {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const fine = useFinePointer();

  useTilt(ref, { max: 6, disabled: reduced || !fine });

  return (
    <Tag ref={ref} className={`tilt-card ${className}`} {...rest}>
      {children}
    </Tag>
  );
}
