import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { Text, Image, Button, View } from "dripsy";

export default () => (
  <Tabs>
    <TabList>
      <Tab>Title 1</Tab>
      <Tab>Title 2</Tab>
    </TabList>

    <TabPanel>
      <Text>Any content 1</Text>
    </TabPanel>
    <TabPanel>
      <Text>Any content 2</Text>
    </TabPanel>
  </Tabs>
);
