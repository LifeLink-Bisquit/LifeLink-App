import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Alert} from 'react-native';
import ChangePasswordIcon from '../../../../../assets/svgs/change_password.svg';
import EnFlag from '../../../../../assets/svgs/en.svg';
import InfoIcon from '../../../../../assets/svgs/info.svg';
import LanguageIcon from '../../../../../assets/svgs/language.svg';
import LogoutIcon from '../../../../../assets/svgs/logout.svg';
import MedicineIcon from '../../../../../assets/svgs/medicine.svg';
import TurkeyFlag from '../../../../../assets/svgs/tr.svg';
import {
  STORAGE_KEYS,
  getRandomColor,
  getUser,
  storage,
} from '../../../../constants/app.utils';
import {
  Languages,
  switchLanguage,
} from '../../../../constants/translations.utils';
import {useUserProfileNavigation} from '../../../../hooks/useUserProfileNavigation';
import {UserProfileScreens} from '../../../../navigation/routes';
import {getAllEvacPerson} from '../../../../services/api/evacPerson/getAllEvacPerson';
import useGeneralStore from '../../../../zustand/generalStore';
import {useLocalizationStore} from '../../../../zustand/translationStore';
import Avatar from '../../../components/Avatar/Avatar';
import ListItem from '../../../components/ListItem/ListItem';
import Screen from '../../../components/Screen/Screen';
import Spacer from '../../../components/Spacer/Spacer';
import {Email, Name, SettingsContainer} from './styles';

interface ProfileProps {
  navigation: any;
}

const UserProfileScreen: React.FC<ProfileProps> = () => {
  const userDetails = getUser();

  const {navigate} = useUserProfileNavigation<UserProfileScreens.UserProfile>();

  const {language} = useLocalizationStore();
  const [currentLanguage, setCurrentLanguage] = useState(
    language.toUpperCase(),
  );

  const {t} = useTranslation();
  const changeLanguage = () => {
    if (currentLanguage === 'EN') {
      switchLanguage(Languages.TR);
      setCurrentLanguage('TR');
    } else {
      switchLanguage(Languages.EN);
      setCurrentLanguage('EN');
    }
  };

  const handleLogout = () => {
    const setIsLoggedIn = useGeneralStore.getState().setLoginState;

    Alert.alert(t('logout'), t('logoutMessage'), [
      {text: t('cancel'), onPress: () => {}},
      {
        text: t('yes'),
        onPress: () => {
          storage.delete(STORAGE_KEYS.TOKEN);
          setIsLoggedIn(false);
        },
      },
    ]);
  };

  const navigateToMyPeople = () => {
    getAllEvacPerson(data =>
      navigate(UserProfileScreens.UsersPeople, {data: data}),
    );
  };

  const handleChangePassword = () => {
    navigate(UserProfileScreens.ChangePassword);
  };

  const handleAboutUs = () => {
    navigate(UserProfileScreens.AboutUs);
  };

  return (
    //TODO: styled component can be use
    <Screen
      // eslint-disable-next-line react-native/no-inline-styles
      containerStyle={{justifyContent: 'flex-start', paddingTop: 16}}
      useSafeArea={false}
      useScrollView>
      <Avatar
        text={userDetails.name}
        size={90}
        backgroundColor={getRandomColor()}
      />
      <Name>{userDetails.name}</Name>
      <Email>{userDetails.email}</Email>
      <SettingsContainer>
        {/* <ListItem
          title="editProfile"
          leftItem={<EditProfileIcon />}
          onPress={handleLogout}
        /> */}
        <ListItem
          title="changePassword"
          leftItem={<ChangePasswordIcon />}
          onPress={handleChangePassword}
        />

        <ListItem
          title="people"
          leftItem={<MedicineIcon />}
          onPress={navigateToMyPeople}
        />
        <Spacer height={40} />
        <ListItem
          title="switchLanguage"
          leftItem={<LanguageIcon />}
          onPress={changeLanguage}
          rightItem={currentLanguage === 'EN' ? <EnFlag /> : <TurkeyFlag />}
        />
        <ListItem
          title="aboutUs"
          leftItem={<InfoIcon />}
          onPress={handleAboutUs}
        />
        <ListItem
          title="logout"
          leftItem={<LogoutIcon />}
          onPress={handleLogout}
        />
        {/* <ListItem
          title="deleteAccount"
          leftItem={<DeleteIcon />}
          onPress={handleLogout}
        /> */}
        <Spacer height={40} />
      </SettingsContainer>
    </Screen>
  );
};

export default UserProfileScreen;
