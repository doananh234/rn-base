import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Animated,
  Dimensions,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/mealplanner';
import {Colors} from 'themes/index';
import Button from './Button';
import {safeArea} from 'utils/Devices';

export default class SwipperView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedIndex: 0,
    };
    this.flatlist = React.createRef();
    this.animatedPaging = new Animated.Value(0);
  }

  componentDidMount() {
    const {autoScroll} = this.props;
    autoScroll && this.intevalScroll();
  }

  componentWillUnmount() {
    clearInterval(this.inteval);
  }

  intevalScroll = () => {
    let currentIndex = 0;
    this.inteval = setInterval(() => {
      currentIndex = currentIndex + 1 > 2 ? 0 : currentIndex + 1;
      this.flatlist.current && this.onJump(currentIndex);
    }, 3000);
  };

  renderPage = ({item}) => {
    return item;
  };

  scrollToItem = e => {
    this.currentIndex = Math.round(e.nativeEvent.contentOffset.x / width);
    this.onJump(this.currentIndex);
  };

  onJump = index => {
    const {children, onChangeIndex} = this.props;
    if (index < 0 || index >= children.length) {
      return;
    }
    onChangeIndex && onChangeIndex(index);

    this.flatlist.current.scrollTo({x: index * width, animated: true});
  };

  adjustPageSize = () => {
    // this.setState({
    //   width: e.nativeEvent.layout.width,
    // });
  };

  renderPageNumber = () => {
    const {children, next, btnSkip} = this.props;
    const pagingColor = [];
    const pagingRange = [];
    const pagingRadius = [];
    const components = children.map((data, index) => {
      pagingColor.push(
        this.animatedPaging.interpolate({
          inputRange: [
            -9999,
            (index - 1) * width,
            index * width,
            (index + 1) * width,
            9999,
          ],
          outputRange: [
            Colors.lightGray,
            Colors.lightGray,
            Colors.primary,
            Colors.lightGray,
            Colors.lightGray,
          ],
        }),
      );
      pagingRange.push(
        this.animatedPaging.interpolate({
          inputRange: [
            -9999,
            (index - 1) * width,
            index * width,
            (index + 1) * width,
            9999,
          ],
          outputRange: [6, 6, 8, 6, 6],
        }),
      );
      pagingRadius.push(
        this.animatedPaging.interpolate({
          inputRange: [
            -9999,
            (index - 1) * width,
            index * width,
            (index + 1) * width,
            9999,
          ],
          outputRange: [3, 3, 4, 3, 3],
        }),
      );
      return (
        <Animated.View
          key={Number(index).toString()}
          style={[
            styles.paggingPoint,
            {
              backgroundColor: pagingColor[index],
              width: pagingRange[index],
              height: pagingRange[index],
              borderRadius: pagingRadius[index],
            },
          ]}
        />
      );
    });
    return (
      <View style={styles.vPagging}>
        {this.renderFooterTitle()}
        <View style={styles.vPointer}>{components}</View>
        {btnSkip && (
          <Button
            backgroundColor={Colors.primary}
            style={styles.btnSkip}
            textStyle={styles.btnText}
            onPress={() => {
              next && next();
            }}
            text="Skip"
          />
        )}
      </View>
    );
  };

  renderFooterTitle = () => {
    const {selectedIndex} = this.state;
    const {children} = this.props;
    if (children[selectedIndex].props.footerTitle) {
      return (
        <View style={styles.vTitleFooter}>
          <Text style={styles.titleFooter}>
            {children[selectedIndex].props.footerTitle.title}
          </Text>
          <Text style={styles.descriptionFooter}>
            {children[selectedIndex].props.footerTitle.description}
          </Text>
        </View>
      );
    }
    return <View />;
  };

  render() {
    const {showArrow, children, style, showPagging, scrollEnabled} = this.props;
    const {selectedIndex} = this.state;
    return (
      <View style={[styles.vFlatList, style]}>
        <ScrollView
          ref={this.flatlist}
          onScroll={Animated.event([
            {nativeEvent: {contentOffset: {x: this.animatedPaging}}},
          ])}
          onMomentumScrollEnd={this.scrollToItem}
          style={styles.vFlatList}
          horizontal
          pagingEnabled
          directionalLockEnabled
          onLayout={this.adjustPageSize}
          showsHorizontalScrollIndicator={false}
          data={children}
          renderItem={this.renderPage}
          keyExtractor={data => {
            return data.key;
          }}
          scrollEventThrottle={16}
          scrollEnabled={scrollEnabled}
          getItem>
          {children}
        </ScrollView>
        {showArrow && (
          <TouchableOpacity
            style={styles.btnBack}
            onPress={() => {
              this.onJump(selectedIndex - 1);
            }}>
            <View style={styles.btnBack}>
              <Icon name="left" style={styles.icon} />
            </View>
          </TouchableOpacity>
        )}
        {showArrow && (
          <TouchableOpacity
            style={styles.btnNext}
            onPress={() => {
              this.onJump(selectedIndex + 1);
            }}>
            <View style={styles.btnNext}>
              <Icon name="right" style={styles.icon} />
            </View>
          </TouchableOpacity>
        )}
        {showPagging && this.renderPageNumber()}
      </View>
    );
  }
}

SwipperView.propTypes = {
  children: PropTypes.any,
  showArrow: PropTypes.bool,
  style: PropTypes.any,
  btnSkip: PropTypes.bool,
  autoScroll: PropTypes.bool,
  next: PropTypes.func,
  onChangeIndex: PropTypes.func,
  showPagging: PropTypes.bool,
  scrollEnabled: PropTypes.bool,
};

SwipperView.defaultProps = {
  showPagging: true,
};

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  vFlatList: {
    flex: 1,
  },
  vPagging: {
    paddingTop: 10,
    alignItems: 'center',
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  vPointer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  paggingPoint: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginHorizontal: 5,
    backgroundColor: Colors.lightGray,
    bottom: safeArea().bottom + 20,
  },
  vTitleFooter: {
    alignItems: 'center',
    backgroundColor: 'transparent',
    justifyContent: 'center',
    paddingHorizontal: 10,
    paddingBottom: 15,
  },
  titleFooter: {
    backgroundColor: 'transparent',
    textAlign: 'center',
    paddingBottom: 15,
    color: Colors.secondaryText,
  },
  descriptionFooter: {
    backgroundColor: 'transparent',
    textAlign: 'center',
    color: Colors.secondaryText,
  },
  btnSkip: {
    backgroundColor: Colors.darkprimary,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 10,
    height: 38,
  },
  btnNext: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    width: 40,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  btnBack: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    width: 40,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  icon: {
    color: Colors.primaryText,
    fontSize: 30,
  },
  btnText: {
    color: 'white',
  },
});
