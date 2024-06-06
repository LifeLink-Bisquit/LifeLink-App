import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Alert} from 'react-native';
import AidIcon from '../../../../../assets/svgs/aid.svg';
import ChangePasswordIcon from '../../../../../assets/svgs/change_password.svg';
import DeleteIcon from '../../../../../assets/svgs/delete.svg';
import EditProfileIcon from '../../../../../assets/svgs/edit_profile.svg';
import EnFlag from '../../../../../assets/svgs/en.svg';
import InfoIcon from '../../../../../assets/svgs/info.svg';
import LanguageIcon from '../../../../../assets/svgs/language.svg';
import LogoutIcon from '../../../../../assets/svgs/logout.svg';
import StatusIcon from '../../../../../assets/svgs/status.svg';
import TurkeyFlag from '../../../../../assets/svgs/tr.svg';
import {STORAGE_KEYS, getUser, storage} from '../../../../constants/app.utils';
import {
  Languages,
  switchLanguage,
} from '../../../../constants/translations.utils';
import useGeneralStore from '../../../../zustand/generalStore';
import {useLocalizationStore} from '../../../../zustand/translationStore';
import ListItem from '../../../components/ListItem/ListItem';
import Screen from '../../../components/Screen/Screen';
import Spacer from '../../../components/Spacer/Spacer';
import {Email, Name, SettingsContainer} from './styles';
import Avatar from '../../../components/Avatar/Avatar';

interface ProfileProps {
  navigation: any;
}

const ProfileScreen: React.FC<ProfileProps> = () => {
  const userDetails = getUser();

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
    storage.delete(STORAGE_KEYS.TOKEN);
    Alert.alert(t('logout'), t('logoutMessage'), [
      {text: t('cancel'), onPress: () => {}},
      {text: t('yes'), onPress: () => setIsLoggedIn(false)},
    ]);
  };

  return (
    //TODO: styled component can be use
    <Screen
      // eslint-disable-next-line react-native/no-inline-styles
      containerStyle={{justifyContent: 'flex-start', paddingTop: 16}}
      useSafeArea={false}
      useScrollView>
      <Avatar text={userDetails.name} size={90} />
      <Name>{userDetails.name}</Name>
      <Email>{userDetails.email}</Email>
      <SettingsContainer>
        <ListItem
          title="editProfile"
          leftItem={<EditProfileIcon />}
          onPress={handleLogout}
        />
        <ListItem
          title="changePassword"
          leftItem={<ChangePasswordIcon />}
          onPress={handleLogout}
        />
        <ListItem
          title="changeStatus"
          leftItem={<StatusIcon />}
          onPress={handleLogout}
        />
        <ListItem
          title="evacuationHistory"
          leftItem={<AidIcon />}
          onPress={handleLogout}
        />
        <ListItem
          title="callHelp"
          leftItem={<LogoutIcon />}
          onPress={handleLogout}
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
          onPress={handleLogout}
        />
        <ListItem
          title="logout"
          leftItem={<LogoutIcon />}
          onPress={handleLogout}
        />
        <ListItem
          title="deleteAccount"
          leftItem={<DeleteIcon />}
          onPress={handleLogout}
        />
        <Spacer height={40} />
      </SettingsContainer>
    </Screen>
  );
};

export default ProfileScreen;
