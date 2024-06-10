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

export function getEvacPersonMedicationStatusById(
  id: string,
): string | undefined {
  const EVAC_PERSON_MEDICATION: {[key: string]: string} = {
    '961a1ae7-6d3c-4e47-cce1-049cec49cce0': 'Ibuprofen',
    '961a1ae7-6d3c-4e47-cce1-049cec49cce1': 'Morphine',
    '961a1ae7-6d3c-4e47-cce1-049cec49cce2': 'Aspirin',
  };
  return EVAC_PERSON_MEDICATION[id];
}

export function getEvacPersonIllnessStatusById(id: string): string | undefined {
  const EVAC_PERSON_ILLNESS: {[key: string]: string} = {
    '961a1ae7-6d3c-4e47-dce1-049cec49cce0': 'Diabetes (Type 1)',
    '961a1ae7-6d3c-4e47-dce1-049cec49cce1': 'Diabetes (Type 2)',
    '961a1ae7-6d3c-4e47-dce1-049cec49cce2': 'Diarrhea',
  };
  return EVAC_PERSON_ILLNESS[id];
}

export function getEvacPersonSpecialNeedsStatusById(
  id: string,
): string | undefined {
  const EVAC_PERSON_SPECIAL_NEEDS: {[key: string]: string} = {
    '961a1ae7-6d3c-4e47-ade1-049cec49cce0': 'Heart Battery',
    '961a1ae7-6d3c-4e47-ade1-049cec49cce1': 'Glasses',
  };
  return EVAC_PERSON_SPECIAL_NEEDS[id];
}

export function getEvacPersonProsthesisStatusById(
  id: string,
): string | undefined {
  const EVAC_PERSON_PROSTHESIS: {[key: string]: string} = {
    '961a1ae7-6d3c-4e47-aee1-049cec49cce0': 'Arm',
    '961a1ae7-6d3c-4e47-aee1-049cec49cce1': 'Leg',
  };
  return EVAC_PERSON_PROSTHESIS[id];
}

export const EMERGENCY_PHONE_NUMBER = '112';
