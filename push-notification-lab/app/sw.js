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

self.addEventListener('notificationclose', event => {
    const notification = event.notification;
    const primaryKey = notification.data.primaryKey;

    console.log("Closed notification: ", primaryKey);
});

self.addEventListener('notificationclick', event => {
    const notification = event.notification;
    const primaryKey = notification.data.primaryKey;
    const action = event.action;

    if (action === 'close') {
        self.registration.getNotifications().then(notifications => {
            notifications.forEach(notification => notification.close());
        });
    } else {
        clients.matchAll().then(clients => {
            const client = clients.find(client => {
                return client;
            })
            if(client !== undefined) {
                client.navigate('samples/page' + primaryKey + '.html');
                client.focus();
            } else {
                //There are no visible windows. Open one.
                clients.openWindow('samples/page' + primaryKey + '.html');
                notification.close();
            }
        })
        notification.close();
    }

})

self.addEventListener('push', event => {
    let body;

    if(event.data) {
        body = event.data.text();
    } else {
        body = 'Default body'
    }
    const options = {
        body: body,
        icon: 'images/notification-flat.png',
        vibrate: [100, 50, 100],
        data: {
            dateofArrival: Date.now(),
            primaryKey: 1
        },
        actions: [
            { action: 'explore', title: 'Go to the site', icon: 'images/checkmark.png' },
            { action: 'close', title: 'Close the notification', icons: 'images/xmark.png' }
        ]
    };

    event.waitUntil(
        clients.matchAll().then((c) => {
            console.log(c);
            if(c.length === 0) {
                self.registration.showNotification('Push Notification', options)
            } else {
                // Send a message to the page to update the UI
                console.log('Application is already open!');
            }
        })
    )
})
