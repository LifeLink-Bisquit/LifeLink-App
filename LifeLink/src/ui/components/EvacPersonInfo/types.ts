import {EvacPerson} from '../../../services/api/types/app.types';

export interface EvacueeInfoProps {
  evacPerson?: EvacPerson;
  onPress?: () => void;
  type?: 'details' | 'edit';
}
