import * as Notifications from "expo-notifications";
import { SchedulableTriggerInputTypes } from "expo-notifications";
import { Alert } from "react-native";

const notificationListener = Notifications.setNotificationCategoryAsync(
  "myCategory",
  [
    {
      buttonTitle: "Say",
      identifier: "say",
      options: {
        opensAppToForeground: false,
      },
      textInput: {
        submitButtonTitle: "Say",
        placeholder: "Type something",
      },
    },
    {
      buttonTitle: "Ignore",
      identifier: "ignore",
      options: {
        isDestructive: true,
      },
    },
  ],
);

export const service = {
  setup() {
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldPlaySound: false,
        shouldSetBadge: true,
        shouldShowBanner: true,
        shouldShowList: true,
      }),
    });

    Notifications.addNotificationResponseReceivedListener((res) => {
      Alert.alert("Id:", res.actionIdentifier);
      Alert.alert(
        "Data: ",
        res.notification.request.content.data.senderName as string,
      );
    });
  },
  notify(date: Date) {
    Notifications.scheduleNotificationAsync({
      content: {
        title: "Look at that notification",
        body: "I'm so proud of myself!",
      },
      trigger: {
        type: SchedulableTriggerInputTypes.DATE,
        date: date,
      },
    });
  },
  scheduleNotify() {
    return Notifications.scheduleNotificationAsync({
      content: {
        title: "Look at that notification",
        body: "I'm so proud of myself!",
      },
      trigger: {
        type: SchedulableTriggerInputTypes.TIME_INTERVAL,
        seconds: 4,
      },
    });
  },
  async cancel(id: string) {
    await Notifications.cancelScheduledNotificationAsync(id);
  },
  notificationWithActions() {
    Notifications.scheduleNotificationAsync({
      content: {
        title: "Look at that notification",
        body: "I'm so proud of myself!",
        categoryIdentifier: "myCategory",
        data: {
          dialogId: 33,
          senderName: "Oleg",
        },
      },
      trigger: null, // notify now,
    });
  },
};