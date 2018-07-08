import React from 'react';
import {
  Text,
  View,
} from 'react-native';
import { Route, withRouter, Switch } from 'react-router-native'
import Swiper from '../components/react-native-swiper-animated';
import Splash from '../screens/Splash'
import style from '../theme/styles/intro'
import { Button } from '../theme'
import CreateUser from '../screens/user/Create'

const debug = require('debug')('igumail:intro')

const BTN_TITLE = 'GET STARTED'

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
    this.props.history.push('/intro/user/create')
  }

  render() {

    const SlidesRoute = props => <Slides {...this.props} onDone={() => this.onDone()} />
    const CreateUserRoute = withRouter(CreateUser)

    return (
      <Switch>
        <Route path="/intro/user/create" component={CreateUserRoute} />
        <Route path="/" component={SlidesRoute} />
      </Switch>
    )
  }
}
