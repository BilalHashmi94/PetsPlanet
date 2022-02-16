import React from 'react';
import {View, Text, StyleSheet, ScrollView, FlatList} from 'react-native';
import Header from '../../components/Header';
import {Colors, Metrix} from '../../config';

const TermsAndConditions = () => {
  let data = [
    {
      title: 'Conditions Of Use',
      description:
        'Black 365 provides and operates the domain name www.black364.com, through which users create mobile application (individually the “App”) and various related services are provided to by us to you and to the users (“Service/s”) (hereinafter the Website and App, collectively referred as the "site"), subject to the compliance with all the terms, conditions, and notices contained or referenced herein (the "Terms of Use"), as well as any other written agreement between us and you. In addition, when using particular services or materials on this site, users shall be subject to any posted rules applicable to such services or materials that may contain terms and conditions in addition to those in these Terms of Use. All such guidelines or rules are hereby incorporated by reference into these Terms of Use.',
    },
    {
      title: 'Copyrights',
      description:
        'BY USING THIS SITE, YOU AGREE TO BE BOUND BY THESE TERMS OF USE. IF YOU DO NOT WISH TO BE BOUND BY THE THESE TERMS OF USE, PLEASE EXIT ',
    },
  ];

  const renderItem = (item, index) => {
    console.warn('item', item);
    return (
      <View
        style={{
          marginVertical: Metrix.VerticalSize(20),
          paddingHorizontal: Metrix.HorizontalSize(20),
        }}>
        <Text
          style={{
            // fontFamily: 'Poppins-SemiBold',
            fontSize: Metrix.customFontSize(14),
          }}>
          {item.index + 1}. {item.item.title}
        </Text>
        <Text
          style={{
            marginVertical: 10,
            // fontFamily: 'Poppins-Regular',
            fontSize: Metrix.customFontSize(14),
          }}>
          {item.item.description}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.conatainer}>
      <Header />
      <View style={styles.secondView}>
        <Text style={styles.welcomeText}>Terms And Conditions</Text>
      </View>
      <View
        style={{
          height: Metrix.VerticalSize(585),
          width: '100%',
          borderRadius: 8,
          backgroundColor: '#F7F7F7',
        }}>
        <FlatList
          data={data}
          keyExtractor={index => index.toString()}
          renderItem={renderItem}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  conatainer: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: Metrix.HorizontalSize(35),
  },
  welcomeText: {
    color: Colors.black,
    fontSize: Metrix.customFontSize(25),
    fontWeight: 'bold',
    marginBottom: 10,
    // fontFamily: 'Poppins-Black',
  },
  secondView: {
    marginVertical: Metrix.VerticalSize(10),
  },
});

export default TermsAndConditions;
