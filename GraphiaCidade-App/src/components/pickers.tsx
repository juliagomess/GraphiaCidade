import React, { useEffect, useState, useMemo } from 'react';
import { TouchableOpacity } from 'react-native';

export const PickerInput = ({
  data,
  keyField,
  textField,
  onPicked,
  initialPickedKey,
  ...rest
}) => {
  const [showOverlay, setShowOverlay] = useState(false);
  const [pickedLabel, setPickedLabel] = useState(null);

  const simple = useMemo(() => data.length <= 30, [data]);

  useEffect(() => {
    if (initialPickedKey) {
      const initial = data.find(item => item[keyField] == initialPickedKey); // nao checar tipo

      if (initial) {
        setPickedLabel(initial[textField]);
        onPicked(initial);
      }
    }
  }, []);

  return (
    <TouchableOpacity onPress={() => setShowOverlay(true)} activeOpacity={0.7}>
      <InputBase
        value={pickedLabel}
        rightIcon={{
          type: 'material-community',
          name: 'chevron-down-box',
          color: theme.color,
          size: 36,
        }}
        disabled
        {...rest}
      />

      <Overlay
        isVisible={showOverlay}
        onBackdropPress={() => setShowOverlay(false)}
        overlayStyle={{ height: 330 }}
      >
        <Container>
          {simple ? (
            <FlatList
              data={data}
              keyExtractor={item => item[keyField].toString()}
              renderItem={({ item }) => (
                <ListItem
                  title={item[textField]}
                  bottomDivider
                  onPress={() => {
                    setTimeout(() => {
                      setPickedLabel(item[textField]);
                      onPicked(item);
                      setShowOverlay(false);
                    }, 100);
                  }}
                  chevron
                />
              )}
              ListHeaderComponent={
                <Text style={{ fontWeight: 'bold' }}>Selecione um item:</Text>
              }
            />
          ) : (
            <PickerFilter
              options={data.map(item => ({
                key: item[keyField].toString(),
                label: item[textField],
              }))}
              onPicked={key => {
                setTimeout(() => {
                  const itemSelected = data.find(
                    item => item[keyField].toString() === key.toString(),
                  );

                  setPickedLabel(itemSelected[textField]);
                  onPicked(itemSelected);
                  setShowOverlay(false);
                }, 100);
              }}
            />
          )}
        </Container>
      </Overlay>
    </TouchableOpacity>
  );
};

PickerInput.defaultProps = {
  initialPickedKey: null,
};

PickerInput.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  keyField: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  textField: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  onPicked: PropTypes.func.isRequired,
  initialPickedKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};
