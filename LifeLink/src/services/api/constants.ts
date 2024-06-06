export const ADMIN_ROLE = '961a1ae7-6d3c-4e47-ace1-049cec49cce0';
export const FIELD_OPERATOR_ROLE = '961a1ae7-6d3c-4e47-ace1-049cec49cce1';
export const PERSON_ROLE = '961a1ae7-6d3c-4e47-ace1-049cec49cce2';

export const TR_PHONE_PREFIX = '+90';
export const TR_PHONE_CODE = '90 ';

export function getEvacPersonStatusById(id: string): string | undefined {
  const EVAC_PERSON_STATUS: {[key: string]: string} = {
    '961a1ae7-6d3c-4e47-bce1-049cec49cce0': 'SAFE',
    '961a1ae7-6d3c-4e47-bce1-049cec49cce1': 'UNKNOWN',
    '961a1ae7-6d3c-4e47-bce1-049cec49cce2': 'NEEDS_ASSISTANCE',
    '961a1ae7-6d3c-4e47-bce1-049cec49cce3': 'GETTING_TREATMENT',
    '961a1ae7-6d3c-4e47-bce1-049cec49cce4': 'DECEASED',
    '961a1ae7-6d3c-4e47-bce1-049cec49cce5': 'NEUTRAL',
  };
  return EVAC_PERSON_STATUS[id];
}
