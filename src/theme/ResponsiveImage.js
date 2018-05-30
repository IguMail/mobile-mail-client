import React, { Component } from 'react'
import { View, Image, ActivityIndicator } from 'react-native'

const styles = {
  container: {
    alignSelf: 'stretch',
    flex: 1
  },
  center: {
    
  }
}

// https://github.com/wassgha/react-native-fullwidth-image
class ResponsiveImage extends Component {

    constructor(props) {
        super(props)

        this.state = {
            width: props.width || null,
            height: props.height || null,
            loaded: false,
            size: {}
        }
    }

    setNativeProps(nativeProps) {
      this._root.setNativeProps(nativeProps)
    }

    onLayout(event) {
        const containerWidth = event.nativeEvent.layout.width

        if (this.props.ratio) {
            this.setState({
                width: containerWidth,
                height: containerWidth * this.props.ratio
            })
        } else if (this.props.width && this.props.height) {
          this.setState({
              width: containerWidth,
              height: containerWidth * (this.props.height / this.props.width)
          })
        } else if (this.props.source && this.props.source.uri) {
            Image.getSize(this.props.source.uri, (width, height) => {
                this.setState({
                    width: containerWidth,
                    height: containerWidth * height / width
                })
            })
        }
    }

    onLoad(event) {
      this.setState({
        loaded: true
      })
    }

    render() {
        return (
            <View
                ref={component => this._root = component}
                onLayout={event => this.onLayout(event)}
                style={styles.container}
            >
                <Image
                    source={this.props.source}
                    style={[this.props.style, {
                        width: this.state.width,
                        height: this.state.height
                    }]}
                    onLoadEnd={event => this.onLoad(event)}
                    onLoad={event => this.onLoad(event)}
                />
                {
                  !this.state.loaded && (
                    <View style={{
                      position: 'absolute',
                      width: this.state.width || '100%',
                      height: this.state.height || 200,
                      backgroundColor: '#eee',
                      alignItems: 'center', 
                      justifyContent: 'center',
                    }}
                    >
                      <ActivityIndicator />
                    </View>
                  )
                }
            </View>
        )
    }
}

export default ResponsiveImage