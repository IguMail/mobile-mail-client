import React from 'react';
import {
  Text,
  View,
} from 'react-native';
import { Route, withRouter, Switch } from 'react-router-native'
import Swiper from '../components/react-native-swiper-animated';
import Splash from '../screens/Splash'
import styles from '../theme/styles'
import { Button } from '../theme'
import CreateUser from '../screens/user/Create'

const debug = require('debug')('chaterr:intro')

const BTN_TITLE = 'GET STARTED'

const style = {
  wrapper: {
    backgroundColor: '#e1f6ff',
  },
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e91e63',
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#673ab7',
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3f51b5',
  },
  slide4: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#95d7a2',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  dot: {
    height: 10,
    width: 10
  },
  activeDot: {
    width: 26
  },
  btnStyle: {
    ...styles.btnPrimary,
    width: 250,
    height: 50,
    marginTop: 20
  },
};

const GetStarted = props => (
  <View>
    <Text style={style.text}>Chat like mail thread</Text>
    <Button
      title={BTN_TITLE}
      buttonStyle={style.btnStyle}
      onPress={() => props.onDone()}
    />
  </View>
)

const Slides = props => (
  <Swiper
    style={style.wrapper}
    swipeDirection='left'
    tapToNext
    smoothTransition
    showPaginationBelow
    hidePaginationOnLast
    paginationDotColor='#c8d5dd'
    paginationActiveDotColor='#3f8efc'
  >
    <View style={style.slide1}>
      <Splash loaded={true} />
    </View>
    <View style={style.slide2}>
      <Text style={style.text}>Prioritize your inbox</Text>
    </View>
    <View style={style.slide3}>
      <Text style={style.text}>Set the status</Text>
    </View>
    <View style={style.slide4}>
      <GetStarted onDone={props.onDone} />
    </View>
  </Swiper>
)

export default class Intro extends React.Component {

  onDone() {
    debug('Done')
    this.props.history.push('/user/create')
  }

  render() {

    const SlidesRoute = props => <Slides {...this.props} onDone={() => this.onDone()} />
    const CreateUserRoute = withRouter(CreateUser)

    return (
      <Switch>
        <Route path="/user/create" component={CreateUserRoute} />
        <Route path="/" component={SlidesRoute} />
      </Switch>
    )
  }
}