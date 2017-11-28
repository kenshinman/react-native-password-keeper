import React, {Component } from 'react';
import { View } from 'react-native';
import { Footer } from 'native-base';
import {
  AdMobBanner,
  AdMobInterstitial,
  PublisherBanner,
  AdMobRewarded,
} from 'react-native-admob'

class FooterAds extends Component {
  state = {}
  render() {
    return (
      <Footer style={styles.footer}>
        <AdMobBanner
          adSize="banner"
          adUnitID={this.props.adId}
          testDevices={['2dc7a4dd36fe3ca3']}
          onAdFailedToLoad={error => console.error(error)}
        />
      </Footer>
    );
  }
}

const styles = {
  footer: {
    backgroundColor: 'transparent'
  }
}
export default FooterAds;