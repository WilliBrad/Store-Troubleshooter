// data/itIssues.js

export const categories = [
  {
    id: "pos",
    name: "POS / Registers",
    issues: [
      {
        id: "pos-frozen",
        title: "POS Screen Frozen / Not Responding",
        isCommon: true,
        symptoms: [
          "Order not cashing out",
          "Buttons lagging or stuck on one screen",
        ],
        steps: [
          "Before a restart try to ring up a water and overring order",
          "If still frozen, restart the POS using your approved store procedure (no breaker flips) and repeat step 1.",
          "After restart, run a small test order to confirm it works.",
        ],
        escalation:
          "If the POS does not load, shows repeated errors, or cannot connect after restart, move traffic to another POS if possible and contact Gage or AJ.",
        tags: ["front counter", "drive-thru", "pos"],
      },
      {
        id: "pos-offline",
        title: "POS Showing 'Offline' or Red Network Icon",
        isCommon: true,
        symptoms: [
          "POS cannot send orders to kitchen",
          "would you like to try again message",
          "Offline indicator on screen",
        ],
        steps: [
          "Check if other POS devices are working.",
          "If multiple POS devices show offline, treat it as a waystation issue and promote to backup.",
          "Confirm the POS network cable is firmly plugged in (if visible and) usually a yellow cable.",
          "If only one POS is affected, restart that POS using normal procedure.",
        ],
        escalation:
          "If more than one POS is offline or issues persist, escalate to GM and call Gage or AJ.",
        tags: ["network", "pos"],
      },
    ],
  },

  {
    id: "card",
    name: "Card Readers / PEDs",
    issues: [
      {
        id: "card-no-power",
        title: "Card Reader Has No Power",
        isCommon: true,
        symptoms: [
          "PED screen is black or does not light up",
          "No response when buttons are pressed",
        ],
        steps: [
          "Try holding the RED and GREEN buttons for 10 seconds to reboot the PED.",
          "Check that the power or USB cable is firmly connected on both ends (Follow the black cable on the PED).",
        ],
        escalation:
          "If the device still does not power on, Please call Gage or AJ.",
        tags: ["card", "payments", "peds"],
      },
      {
        id: "card-not-connecting",
        title: "Card Reader Not Connecting / 'Comm Error'",
        isCommon: true,
        symptoms: [
          "POS shows 'No connection to PED' or similar message",
          "Guest cannot insert/tap/swipe because connection fails first",
        ],
        steps: [
          "Check if this happens on one register or multiple.",
          "Confirm network is up (orders sending, other devices online).",
          "Reboot the PED by holding RED and GREEN buttons it shoould power off, repeat the same to turn back on.",
        ],
        escalation:
          "If the error affects multiple readers or continues after reboot, if only one reader move to another POS if possible. Do not attempt to change network/router settings. Call Gage or AJ.",
        tags: ["card", "network", "payments"],
      },
      {
        id: "card-declines",
        title: "Multiple Valid Cards Declining",
        symptoms: [
          "Several guests report declines back-to-back",
          "Declines show generic error with no clear reason",
        ],
        steps: [
          "Confirm the issue across more than one card to rule out a single card problem.",
          "Check if other tenders (cash, mobile pay, gift) are working normally.",
          "Note any recurring error text mentioning host/processor/comm error.",
        ],
        escalation:
          "Treat as possible processor issue. Call Gage or AJ if it continues.",
        tags: ["card", "payments"],
      },
    ],
  },

  {
    id: "kiosk",
    name: "Kiosks",
    issues: [
      {
        id: "kiosk-frozen",
        title: "Kiosk Frozen / Not Responding",
        symptoms: [
          "Screen stuck on one page",
          "Touch not responding for guests",
        ],
        steps: [
          "Check that the kiosk has power (screen brightness / any lights).",
          "Confirm no update or maintenance message is displayed.",
          "If allowed, restart the kiosk application or device per store process.",
          "After restart, place a small test order to confirm it works.",
        ],
        escalation:
          "If the kiosk repeatedly freezes or will not load, temporarily disable it and report via approved IT support channel.",
        tags: ["lobby", "kiosk"],
      },
      {
        id: "kiosk-no-orders",
        title: "Kiosk Orders Not Appearing on Kitchen Screens",
        symptoms: [
          "Guest completes order",
          "No order appears on KVS / production screens",
        ],
        steps: [
          "Confirm kiosk shows 'Order Complete' with a check/order number.",
          "Check if any kiosk orders are appearing or if none are.",
          "If all kiosk orders fail, turn kiosks off for guests and direct to front counter.",
        ],
        escalation:
          "Escalate as a kiosk-to-KVS link issue. Follow IT/KVS support instructions.",
        tags: ["kiosk", "kvs"],
      },
    ],
  },

  {
    id: "printer",
    name: "Printers (Receipt / Kitchen)",
    issues: [
      {
        id: "no-receipt",
        title: "No Receipt Printing at POS",
        isCommon: true,
        symptoms: [
          "Orders complete but no receipt prints",
          "Printer is silent or has no lights",
        ],
        steps: [
          "Check printer power and ensure it is turned on.",
          "Open the cover and confirm a paper roll is loaded correctly.",
          "Check visible cables between printer and POS (if allowed).",
          "Confirm the correct printer is selected in POS settings (if accessible).",
        ],
        escalation:
          "If still not printing, use a backup station if available and contact IT. Avoid random cable swaps.",
        tags: ["pos", "printer"],
      },
      {
        id: "no-kitchen-print",
        title: "Orders Not Printing on Kitchen Printer",
        symptoms: [
          "Orders show on POS but no printed tickets",
        ],
        steps: [
          "Confirm kitchen printer has power and paper.",
          "Clear any paper jams and reload paper.",
          "Check if any orders print at all. If none, use KVS screens as backup.",
        ],
        escalation:
          "Escalate as a routing/KVS or printer issue via approved support. Do not rewire equipment without training.",
        tags: ["kitchen", "printer", "kvs"],
      },
    ],
  },

  {
    id: "headset",
    name: "Drive-Thru Headsets",
    issues: [
      {
        id: "no-audio",
        title: "Can’t Hear Guest / Guest Can’t Hear Us",
        isCommon: true,
        symptoms: [
          "Silence in headset",
          "Guest reports no audio",
        ],
        steps: [
          "Confirm headset is powered on and charged.",
          "Check volume on headset and base station.",
          "Test with another headset to see if it's device vs system.",
          "Verify correct lane selection if multi-lane.",
        ],
        escalation:
          "If all headsets fail, treat as system issue and contact drive-thru/IT support.",
        tags: ["drive-thru", "audio"],
      },
      {
        id: "constant-beeping",
        title: "Headset Constant Beeping / Chime",
        symptoms: [
          "Repeating beeps with no visible car",
        ],
        steps: [
          "Check if a vehicle is parked on the loop/sensor.",
          "Use any documented reset/clear option on the base if trained.",
        ],
        escalation:
          "If alarms will not clear, escalate. Do not randomly unplug components.",
        tags: ["drive-thru"],
      },
    ],
  },

  {
    id: "network",
    name: "Network / Wi-Fi / Systems",
    issues: [
      {
        id: "wifi-down",
        title: "Store Systems / Network Down",
        isCommon: true,
        symptoms: [
          "Multiple devices offline",
          "POS, kiosks, or KVS not connecting",
        ],
        steps: [
          "Confirm if outage affects multiple systems (POS, kiosks, KVS, headsets).",
          "Visually verify networking gear has power (no unplugging unless documented).",
          "If backup/4G/failover is available by policy, follow that documented process.",
        ],
        escalation:
          "Immediately escalate as a store-wide issue via official IT/contact list. No unauthorized cable or config changes.",
        tags: ["network", "store-wide"],
      },
    ],
  },

  {
    id: "monitors",
    name: "Monitors",
    issues: [
      {
        id: "monitor-no-display",
        title: "Monitor Not Displaying Image",
        symptoms: [
          "Black screen or 'No Signal'",
          "Power light off or blinking",
        ],
        steps: [
          "Confirm monitor power cable is secure and outlet is working.",
          "Verify video cable is connected on both monitor and device.",
          "Toggle monitor power button.",
          "If allowed, test with another known good cable/port.",
        ],
        escalation:
          "If still no display, report and do not open the monitor casing.",
        tags: ["monitors", "display", "hardware"],
      },
      {
        id: "monitor-wrong-input",
        title: "Monitor on Wrong Input / Source",
        symptoms: [
          "No signal until changing input",
          "Shows another device feed",
        ],
        steps: [
          "Use the monitor input/source button to cycle to correct input.",
          "Confirm correct cable is plugged in.",
        ],
        escalation:
          "If correct input never shows, contact IT before moving cables.",
        tags: ["monitors", "display"],
      },
    ],
  },

  {
    id: "kvs",
    name: "KVS Controllers",
    issues: [
      {
        id: "kvs-frozen",
        title: "KVS Screen Frozen / Not Updating Orders",
        symptoms: [
          "Orders stuck or not clearing",
          "Touchscreen unresponsive",
        ],
        steps: [
          "Check if one screen or all are affected.",
          "If one, reboot that station/controller per procedure.",
          "If all are frozen, confirm network & power to KVS equipment.",
          "Confirm POS is still sending orders.",
        ],
        escalation:
          "If screens stay frozen after restart, escalate as KVS/network issue via IT. Do not reset switches unless trained.",
        tags: ["kvs", "kitchen", "controller"],
      },
      {
        id: "kvs-offline",
        title: "KVS Controller Offline / No Display",
        symptoms: [
          "No output to kitchen screens from that controller",
          "Controller lights off or unusual blinking",
        ],
        steps: [
          "Check that controller has power and indicator lights.",
          "Ensure Ethernet is firmly connected both ends.",
          "If trained, perform a soft restart of the controller.",
        ],
        escalation:
          "If still offline, escalate for replacement or further guidance.",
        tags: ["kvs", "network", "kitchen"],
      },
    ],
  },
];