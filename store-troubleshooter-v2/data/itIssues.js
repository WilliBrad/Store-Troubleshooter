// data/itIssues.js
// All wording here is written for crew: fast, clear, and safe.

export const categories = [
  //
  // POS / REGISTERS
  //
  {
    id: "pos",
    name: "POS / Registers",
    issues: [
      {
        id: "pos-frozen",
        title: "POS Screen Frozen / Not Responding",
        symptoms: [
          "Touchscreen not responding",
          "Screen stuck on one page",
        ],
        steps: [
          "Be sure to let the guest know there is an issue.",
          "Try Voiding or try to promo the order (sometimes adding a small water helps to promo).",
          "If still frozen, restart the POS by unplugging the power cable and plugging it back in.",
          "After restart, do a small test order to confirm it works.",
        ],
        escalation:
          "If the POS will not start, keeps freezing, or shows errors, call AJ or Gage for more help.",
        tags: ["front counter", "drive-thru", "pos"],
      },
      {
        id: "pos-offline",
        title: "POS Shows 'Network Offline' or 'Waystation Offline'",
        symptoms: [
          "POS says 'Offline' in the top bar by (waystation)",
          "Orders not going to kitchen",
        ],
        steps: [
          "Check if other POS stations are working.",
          "If only this one is offline, Check the network cable (located at the top rear of the POS) and restart just this POS using normal store steps.",
          "If multiple POS stations are offline, it may be a Waystation issue.",
        ],
        escalation:
          "If more than one POS is offline or restart doesn’t fix it, tell a manager and follow your store’s outage / IT help steps. This means putting Production in backup, if assistance is needed call AJ or Gage.",
        tags: ["network", "pos"],
      },
    ],
  },

  //
  // KIOSKS
  //
  {
    id: "kiosk",
    name: "Kiosks",
    issues: [
      {
        id: "kiosk-frozen",
        title: "Kiosk Closed / Not Responding",
        symptoms: [
          " 'Tip' Tap bottom left corner, this will give you the error message (steps 1-2)",
          "Touches not responding (steps 3-4)",
        ],
        steps: [
          "If printer error, check paper, if paper full, flip power button on printer.",
          "Look for any update or error message.",
          "Open whole Kiosk with key, Restart the kiosk using the the power cable on the KVS controller (Black Box in yellow case usually).",
          "After restart, place a test order (small water pay at counter) to make sure touch responds.",
        ],
        escalation:
          "If it keeps freezing or won’t print, ask the GM to submit a ticket for OTP.",
        tags: ["lobby", "kiosk"],
      },
      {
        id: "kiosk-no-orders",
        title: "Kiosk Orders Not Showing in Kitchen",
        symptoms: [
          "Kiosk all showing closed",
        ],
        steps: [
          "Check that the kiosk are logged in (Tap bottom left corner and it will say waystation offline or user not logged in).",
        ],
        escalation:
          "If tapping the bottom left corner says 'Waystation offline' make sure to put the store in backup production to continue running and call Aj or Gage.",
        tags: ["kiosk", "kvs"],
      },
    ],
  },

  //
  // PRINTERS
  //
  {
    id: "printer",
    name: "Printers",
    issues: [
      {
        id: "no-receipt",
        title: "Receipt Not Printing at POS",
        symptoms: [
          "Order finishes but no receipt comes out",
          "Printer looks off or silent",
        ],
        steps: [
          "Make sure the printer is turned on (lights on).",
          "Open the cover and check the paper roll: correct side up and fully seated.",
          "Gently check that the cable to the POS/printer hub is plugged in (if visible and allowed).",
        ],
        escalation:
          "If it still doesn’t print, tell a manager. Use another POS/printer if needed and follow IT support steps.",
        tags: ["pos", "printer"],
      },
      {
        id: "no-kitchen-print",
        title: "No Kitchen Tickets Printing",
        symptoms: [
          "Orders show on POS but not on kitchen printer",
        ],
        steps: [
          "Check if the kitchen printer is on and has paper.",
          "Look for a paper jam and fix it if you’re trained to.",
          "Check if any orders print at all. If none do, use the kitchen screens (if available) while you check further.",
        ],
        escalation:
          "Tell a manager. They can contact IT/support. Do not move network cables unless trained.",
        tags: ["kitchen", "printer", "kvs"],
      },
    ],
  },

  //
  // DRIVE-THRU HEADSETS
  //
  {
    id: "headset",
    name: "Drive-Thru Headsets",
    issues: [
      {
        id: "no-audio",
        title: "Can’t Hear Guest / Guest Can’t Hear Us",
        symptoms: [
          "Silence in headset",
          "Guest says they can’t hear anyone",
        ],
        steps: [
          "Check the headset is on and charged (power light on).",
          "Turn up the volume on the headset/base if available.",
          "Try a different headset to see if only one unit is bad.",
          "Make sure the correct lane/channel is selected.",
        ],
        escalation:
          "If no one can hear on any headset, tell a manager and follow the drive-thru system support process.",
        tags: ["drive-thru", "audio"],
      },
      {
        id: "constant-beeping",
        title: "Headset Constant Beeping",
        symptoms: [
          "Beeping with no car present",
        ],
        steps: [
          "Check if a car is sitting on the loop/sensor outside.",
          "If your store allows, use the base station controls to clear/reset alerts.",
        ],
        escalation:
          "If beeping won’t stop and isn’t sensor-related, tell a manager. Only trained staff should unplug or reset equipment.",
        tags: ["drive-thru"],
      },
    ],
  },

  //
  // NETWORK / STORE SYSTEMS
  //
  {
    id: "network",
    name: "Network / Wi-Fi / Systems",
    issues: [
      {
        id: "wifi-down",
        title: "Multiple Devices Offline / Systems Down",
        symptoms: [
          "POS, kiosks, or KVS all having issues",
          "Card payments or orders not sending",
        ],
        steps: [
          "Check if it’s just one device or several.",
          "If many devices are down, this is likely a store network/system issue.",
          "Visually check that network/IT cabinet has power (no unplugging or button pressing unless you are trained).",
        ],
        escalation:
          "Tell a manager immediately. Follow your store’s outage / IT support instructions. Do not change settings or cables.",
        tags: ["network", "store-wide"],
      },
    ],
  },

  //
  // MONITORS
  //
  {
    id: "monitors",
    name: "Monitors",
    issues: [
      {
        id: "monitor-no-display",
        title: "Monitor is Black / 'No Signal'",
        symptoms: [
          "Screen black or 'No Signal'",
          "Power light off or blinking",
        ],
        steps: [
          "Check the monitor power button and make sure it’s turned on.",
          "Check the power cable at the wall and monitor (no loose plugs).",
          "Gently check the video cable (HDMI/DisplayPort/etc.) is firmly plugged in at both ends.",
        ],
        escalation:
          "If it still shows nothing, tell a manager. Do not open the monitor or force cables.",
        tags: ["monitors", "display", "hardware"],
      },
      {
        id: "monitor-wrong-input",
        title: "Monitor on Wrong Input",
        symptoms: [
          "Shows 'No Signal' but device is on",
          "Shows the wrong screen/source",
        ],
        steps: [
          "Use the monitor’s input/source button to cycle inputs.",
          "Stop when you see the POS/KVS screen you expect.",
          "Make sure the video cable is not loose.",
        ],
        escalation:
          "If no input shows the right screen, tell a manager before changing any cables.",
        tags: ["monitors", "display"],
      },
    ],
  },

  //
  // KVS CONTROLLERS
  //
  {
    id: "kvs",
    name: "KVS Controllers",
    issues: [
      {
        id: "kvs-frozen",
        title: "Kitchen Screen Not Moving / Stuck Orders",
        symptoms: [
          "Orders not moving or clearing",
          "Screen stuck on same tickets",
        ],
        steps: [
          "Check if it’s one screen or all kitchen screens.",
          "If only one screen is stuck, tell a manager; they may restart that KVS/controller if allowed.",
          "If all screens are stuck, it may be a system or network issue.",
          "Confirm POS is still sending orders normally.",
        ],
        escalation:
          "If screens don’t update after approved restart steps, manager should contact IT/support. Do not unplug random boxes or switches.",
        tags: ["kvs", "kitchen"],
      },
      {
        id: "kvs-offline",
        title: "KVS Controller / Screen Offline",
        symptoms: [
          "Screen off or no orders at all",
          "KVS/controller lights off or flashing oddly",
        ],
        steps: [
          "Check if the screen has power (power button, cable seated).",
          "Look at the KVS/controller: if you’re trained, confirm it has power lights.",
          "If your store allows, manager can perform a soft restart.",
        ],
        escalation:
          "If still offline, report to IT through your normal process. Do not move network cables or power strips without approval.",
        tags: ["kvs", "network", "kitchen"],
      },
    ],
  },
];
