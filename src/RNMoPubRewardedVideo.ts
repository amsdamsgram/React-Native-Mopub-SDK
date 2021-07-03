import { NativeEventEmitter, NativeModules, Platform } from "react-native";
const { RNMoPubRewardedVideo } = NativeModules;

export interface IRNMoPubRewardedVideo {
    hasRewardedAdForAdUnit: (adUnitId: string) => Promise<boolean>;
    addEventListener: (eventType: string, listener: (args: any) => void) => void;
    initializeRewardedAd: () => void;
    loadRewardedVideoWithUnitID: (adUnitId: string) => void;
    removeAllListeners: (eventType: string) => void;
    showRewardedVideoWithUnitID: (adUnitId: string, onError: (err: any) => void) => void;
}

const emitter = new NativeEventEmitter(RNMoPubRewardedVideo);

export default {
    hasRewardedAdForAdUnit: async (adUnitId: string) => {
        if (Platform.OS === 'ios') {
            return new Promise((resolve) => {
                RNMoPubRewardedVideo.hasAdAvailableForAdUnitID(adUnitId, (data: {'Has ad': boolean}) => {
                    resolve(data['Has ad']);
                });
            });
        }
        return RNMoPubRewardedVideo.hasRewardedAdForAdUnit(adUnitId);
    },
    addEventListener: (eventType, listener)  => emitter.addListener(eventType, listener),
    initializeRewardedAd: () => RNMoPubRewardedVideo.initializeRewardedAd(),
    loadRewardedVideoWithUnitID: (adUnitId) => RNMoPubRewardedVideo.loadRewardedVideoWithUnitID(adUnitId),
    removeAllListeners: (eventType) => emitter.removeAllListeners(eventType),
    showRewardedVideoWithUnitID: (adUnitId, onError) => RNMoPubRewardedVideo.showRewardedVideoWithUnitID(adUnitId, onError)
} as IRNMoPubRewardedVideo;