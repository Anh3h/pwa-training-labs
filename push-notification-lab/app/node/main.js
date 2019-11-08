/*
Copyright 2018 Google Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

const webPush = require('web-push');

const pushSubscription = {
    "endpoint":"https://fcm.googleapis.com/fcm/send/dhlOzl8tnPE:APA91bHOSLdcIVxWwt7vM4f5x_S7m9VIPB0O8o1p2itH-4Ny8KyGc_rRwq7qC9MRTlxtX2j2NIPLFFdWkWpW_BuRGxBRqvWyPCS6CKIMXP92eb9Pn45y9lhdxJfe1_eZ5HgPOg9G-dVq","expirationTime":null,"keys":{"p256dh":"BI6ThzyFbWvPxEYLvfxJ4nAq_1290WAEUIEkgcZJ8yB4GFugj10IcljxFAoneTyjUfwjM63vgBfhuArtsn9Kni0","auth":"dnrx2Gsrl75gjlYIdCqpjw"}
};

const vapidPublicKey = 'BA3F-sCBM7Hfk9IGGxIVP0j5m7CVykL6Jk3RFIGDOnK1tmbfCpmyAM9Uq5HYargd0BwXJIpAVkm6sqI-gXZeB30';
const vapidPrivateKey = '6gGxAF8zCd1ymaJ7L03jP6YGDM--BKTt1HssfH9Pigs';

const payload = 'Here is my payload';

const options = {
    // gcmAPIKey: '871147752247',
    TTL: 60,
    vapidDetails: {
        subject: 'mailto: courageangeh@gmail.com',
        publicKey: vapidPublicKey,
        privateKey: vapidPrivateKey
    }
};

webPush.sendNotification(
    pushSubscription,
    payload,
    options
);