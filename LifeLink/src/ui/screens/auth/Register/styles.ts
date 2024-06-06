import {StyleSheet} from 'react-native';
import {Colors} from '../../../../constants/colors';

export const styles = StyleSheet.create({
  screen: {justifyContent: 'space-between', paddingVertical: 20},
  logo: {width: 120, height: 120},
  input: {gap: 10},
  date: {
    backgroundColor: Colors.white,
    borderColor: Colors.primary,
    borderWidth: 1,
    borderRadius: 8,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  location: {
    backgroundColor: Colors.white,
    borderColor: Colors.primary,
    borderWidth: 1,
    borderRadius: 8,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    paddingVertical: 12,
  },
  modalContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: '100%',
    height: '80%',
  },
  markerFixed: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    marginLeft: -24,
    marginTop: -48,
  },
  marker: {
    fontSize: 48,
  },
  locationDetails: {
    position: 'absolute',
    bottom: 100,
    width: '100%',
    textAlign: 'center',
    fontSize: 16,
    color: 'white',
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 8,
  },
  locationPre: {flex: 1},
  locationDetail: {
    flex: 3,
  },
});
