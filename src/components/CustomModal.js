import React from 'react';
import {View, Text, FlatList, StyleSheet, TouchableOpacity} from 'react-native';
import RNModal from 'react-native-modal';
import {Colors, Metrix} from '../config';

const renderItem = ({item, index, onSelect}) => {
  return (
    <TouchableOpacity onPress={() => onSelect(item)} style={styles.modalOption}>
      <Text
        style={{
          textAlign: 'center',
          color: Colors.darkGray,
          // fontFamily: 'Inter-Regular',
          fontSize: Metrix.FontSmall,
        }}>
        {item}
      </Text>
    </TouchableOpacity>
  );
};

const renderObject = ({item, index, onSelect}) => {
  return (
    <TouchableOpacity
      onPress={() => onSelect(item)}
      style={{...styles.modalOption}}>
      <Text
        style={{
          textAlign: 'center',
          color: Colors.darkGray,
          // fontFamily: 'Inter-Regular',
          fontSize: Metrix.FontSmall,
        }}>
        {item.name}
      </Text>
      {item?.value2 && (
        <Text
          style={{
            textAlign: 'center',
            color: Colors.darkGray,
            // fontFamily: 'Inter-Regular',
            fontSize: Metrix.FontSmall,
            paddingTop: Metrix.VerticalSize(5),
          }}>
          {item.value2}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const CustomModal = ({
  onSelect = () => {},
  show = false,
  data = [],
  onCancel = () => {},
  type = 'string',
}) => {
  return (
    <RNModal
      isVisible={show}
      style={{flex: 1, zIndex: 100000}}
      // onBackdropPress={onCancel}
    >
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            width: '80%',
            backgroundColor: '#fff',
            borderRadius: 10,
            maxHeight: '70%',
          }}>
          <FlatList
            data={data}
            bounces={false}
            renderItem={({item, index}) =>
              type == 'object'
                ? renderObject({item, index, onSelect})
                : renderItem({item, index, onSelect})
            }
            ListEmptyComponent={() => (
              <View
                style={{
                  paddingVertical: 10,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text style={{color: Colors.placeholderGray}}>
                  No Records Found
                </Text>
              </View>
            )}
          />
          <TouchableOpacity
            onPress={onCancel}
            style={{
              width: '100%',
              paddingVertical: 15,
            }}>
            <Text
              style={{
                textAlign: 'center',
                color: 'red',
                // fontFamily: 'Inter-Regular',
                fontSize: Metrix.FontSmall,
              }}>
              Cancel
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </RNModal>
  );
};

export default CustomModal;

const styles = StyleSheet.create({
  modalOption: {
    width: '100%',
    paddingVertical: 15,
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.placeholderGray,
  },
});
