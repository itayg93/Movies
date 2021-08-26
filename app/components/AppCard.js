import React from "react";
import { StyleSheet } from "react-native";
import { Card, Title, Paragraph } from "react-native-paper";

// api
import Constants from "../api/Constants";

function AppCard({ image, title, description, onPress }) {
  return (
    <Card style={styles.card} onPress={onPress}>
      {/** image */}
      <Card.Cover
        style={styles.cardCover}
        resizeMode="stretch"
        source={{
          uri: `${Constants.IMAGES_BASE_URL}${image}`,
        }}
      />
      <Card.Content>
        {/** title */}
        <Title numberOfLines={1}>{title}</Title>
        {/** description */}
        <Paragraph numberOfLines={2}>{description}</Paragraph>
      </Card.Content>
    </Card>
  );
}

export default AppCard;

const styles = StyleSheet.create({
  card: {
    marginBottom: 10,
  },
  cardCover: {
    height: 400,
  },
});
