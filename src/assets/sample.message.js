module.exports = {
  id: "004f63fe-faf1-4544-af15-71f6a3cb2631",
  account: "mailsync2018@gmail.com",
  attributes: {
    date: "2018-05-22T01:19:18.000Z",
    flags: [],
    modseq: "2876",
    uid: 10,
    "x-gm-labels": ["\\Important"],
    "x-gm-msgid": "1601125176910969307",
    "x-gm-thrid": "1601125176910969307"
  },
  deliveredTo: ["mailsync2018@gmail.com"],
  hash: "89367f74481f1d96ed77d3074e10f5b30d2d9123",
  mail: {
    attachments: [],
    date: "2018-05-22T01:19:17.000Z",
    from: [
      {
        address: "gabe@fijiwebdesign.com",
        name: "Gabiriele Lalasava"
      }
    ],
    headers: {
      "arc-authentication-results":
        "i=1; mx.google.com; dkim=pass header.i=@fijiwebdesign-com.20150623.gappssmtp.com header.s=20150623 header.b=H7CNPnoM; spf=neutral (google.com: 209.85.220.41 is neither permitted nor denied by best guess record for domain of gabe@fijiwebdesign.com) smtp.mailfrom=gabe@fijiwebdesign.com",
      "arc-message-signature":
        "i=1; a=rsa-sha256; c=relaxed/relaxed; d=google.com; s=arc-20160816; h=to:subject:message-id:date:from:mime-version:dkim-signature :arc-authentication-results; bh=XFBG5c7YTc5kDz/OQlDnfu+wmh4pZHS2jUpNArUEM5w=; b=JpWFLzj/dFYeXvzbDLqCPRk9bWIBTmt4UdvlkMeJv4PQ3ETWIkL7NQTXfqbWDQzVAP qOidEioEo8Of2A+HSb+CsiWmS95XhDD5y6Wd7/XBIny8W6pL96NPjkWX/DJej2GRWnNN AuMbuaVvIMZQyW6d1roEbr0IfdXWndm0s8wOcx86dHWrLlAnCbGuPRHVqvM2EK7baLrZ gWLq5gL2ogrQht+3RAxm/FM8BhluLKNsklBVYHWPi+FtQ6TGRoIYyBxAAGJdjZisXWbX a4AsIlx0XIcKO2ObApM+DRJpPNDzK1OzX9zHDBbBjElYDWhD1ql/C45cOYvHtErp8tXZ Tt/Q==",
      "arc-seal":
        "i=1; a=rsa-sha256; t=1526951958; cv=none; d=google.com; s=arc-20160816; b=v36EvxxfqzMIq8DOyfwKE4JJSp4CvRb0m2u5rNmtTQCUEcXqZnsyYD2OTvsscQ9r8Z vRS+BMzFRgx0AsVVRgJBhwMmCmHGXOJuTT0JRnngGuu6Wre4EwkWS2+uvOj0ZMtzNOmZ OIY1DMqwyEiVsGfHk4agyOr83jLoy6Nvr78lqzMmrdD59rn4t40rXpGLPyteAOclX16O N6ABpdGPIyy0AmqB7QaLUAhVIDo7qLHaFvLxGS8RfTgcoF3muwM27TsCjVaoI7yynrmG 3uulDU9SJhOw4TAMd9T2SkDSf/p+rb+k7F0ckBd5VvBuFisMv3Nxg7rEi2eRnPxejZ92 bGdA==",
      "authentication-results":
        "mx.google.com; dkim=pass header.i=@fijiwebdesign-com.20150623.gappssmtp.com header.s=20150623 header.b=H7CNPnoM; spf=neutral (google.com: 209.85.220.41 is neither permitted nor denied by best guess record for domain of gabe@fijiwebdesign.com) smtp.mailfrom=gabe@fijiwebdesign.com",
      "content-type":
        'multipart/alternative; boundary="0000000000000acd6c056cc13501"',
      date: "Tue, 22 May 2018 09:19:17 +0800",
      "delivered-to": "mailsync2018@gmail.com",
      "dkim-signature":
        "v=1; a=rsa-sha256; c=relaxed/relaxed; d=fijiwebdesign-com.20150623.gappssmtp.com; s=20150623; h=mime-version:from:date:message-id:subject:to; bh=XFBG5c7YTc5kDz/OQlDnfu+wmh4pZHS2jUpNArUEM5w=; b=H7CNPnoMEtr2uNLNjC8RKVtmqH/XNsG5DndUQbloJwIwQzLLRSWNbMEpN4+Z1w4/zu 2fvvzUx6rQofelQiFSEzeJEVY2z7fv5H/k6PZjg3xyMJW3JjHy+z22APT1EkH9tCmfYq sbq0knterj7PcP1RLRyqVcjmRm1zqJhrFruQ7iE5mh//pBNTd09x3VqfHbasl8TVtEN2 ioG8I8dTKrwIfqF+k6fQxl0whnGC34c8hOgeVhKUOzlkZjtVEm+n80657O1VpKqb8WSb gH05JrUHwMuLuZwB9lRCJoBIhqHBbcobKXvmNNCRXZhjPQEdlnSn5vP0B+68CUlZMyAW eC7g==",
      from: "Gabiriele Lalasava <gabe@fijiwebdesign.com>",
      "message-id":
        "<CAOn17y=oVv1qAjQNsAbHMifk-_wYbEF46TFr0pD75y-jO_W2ng@mail.gmail.com>",
      "mime-version": "1.0",
      received: [
        "by 2002:a9f:3765:0:0:0:0:0 with SMTP id a34-v6csp953223uae; Mon, 21 May 2018 18:19:19 -0700 (PDT)",
        "from mail-sor-f41.google.com (mail-sor-f41.google.com. [209.85.220.41]) by mx.google.com with SMTPS id h72-v6sor1203465lfh.62.2018.05.21.18.19.18 for <mailsync2018@gmail.com> (Google Transport Security); Mon, 21 May 2018 18:19:18 -0700 (PDT)",
        "by 10.46.99.8 with HTTP; Mon, 21 May 2018 18:19:17 -0700 (PDT)"
      ],
      "received-spf":
        "neutral (google.com: 209.85.220.41 is neither permitted nor denied by best guess record for domain of gabe@fijiwebdesign.com) client-ip=209.85.220.41;",
      "return-path": "<gabe@fijiwebdesign.com>",
      subject: "New mail test",
      to: "mailsync2018@gmail.com",
      "x-gm-message-state":
        "ALKqPwdXvdnUz5si+6wWkwE+hl9RP/Cpw9NkqqbHbfk4p38lDnzxIW7l zcwz+CigtBkfIF48PHZcq7E3Z904aCDpgpZsHei1eg==",
      "x-google-dkim-signature":
        "v=1; a=rsa-sha256; c=relaxed/relaxed; d=1e100.net; s=20161025; h=x-gm-message-state:mime-version:from:date:message-id:subject:to; bh=XFBG5c7YTc5kDz/OQlDnfu+wmh4pZHS2jUpNArUEM5w=; b=dWtth7L0AI0YlqnsEDLNQ2VYjEoLCiu0jRXMYXKH9MgMuUcrCy6dlXmTq4aRfVykBF 3wXeXlVfB+vaqU75w47+HEhnU+sQxnzM4i1bXxpFS+amCqJ9LOK72LQt8IWIDnF87Zko x2JhH2qH8R6fWoVfqIFC4zevEofpIHW7+HOVwu4HSn+2xnhll+MLamwhEzQwQLI3/dGw 7bKXsA4srWQMgeM/F1eD8snVZ4tR+Fx7/qUCZgwOQTsmx8T4XuA/tt56wENUe5Pl4rvB MNBaXP1f89Ol5zU91nfmEWIeiK2h6wXKZ8k7s//PglIguGZStZ7nQHp5ugMbWwVXxijM VQ4w==",
      "x-google-smtp-source":
        "AB8JxZqVZpaGDjSzt8ZFcuvhTu9YDyxZw7VCRhK0QgX475rGzKJmk9ZBu+OpDMxROvKUxb+wDJeOqWdSe6LOxG2kNCM=",
      "x-originating-ip": "[103.30.92.65]",
      "x-received": [
        "by 2002:a19:691a:: with SMTP id e26-v6mr4198945lfc.8.1526951959015; Mon, 21 May 2018 18:19:19 -0700 (PDT)",
        "by 2002:a19:9cc6:: with SMTP id f189-v6mr6743156lfe.119.1526951957935; Mon, 21 May 2018 18:19:17 -0700 (PDT)"
      ]
    },
    html:
      '<div dir="ltr">Hello<br clear="all"><div><div class="gmail_signature" data-smartmail="gmail_signature"><div dir="ltr"><div><div dir="ltr"><div><div dir="ltr"><div><br></div>Regards,<div>Gabe.</div><div><br>------<br>Gabiriele Lalasava</div><div><br></div><div>Founder - SEEDess</div><div><a href="https://seedess.com/" target="_blank">https://seedess.com/</a> <br></div><div><div><br><div>+1 (323) 454-3430<br><a href="mailto:gabe@fijiwebdesign.com" target="_blank">gabe@fijiwebdesign.com</a><br></div></div></div><div><br></div></div></div></div></div></div></div></div>\n</div>\n',
    messageId:
      "CAOn17y=oVv1qAjQNsAbHMifk-_wYbEF46TFr0pD75y-jO_W2ng@mail.gmail.com",
    priority: "normal",
    receivedDate: "2018-05-22T01:19:19.000Z",
    subject: "New mail test",
    text:
      "Hello\n\nRegards,\nGabe.\n\n------\nGabiriele Lalasava\n\nFounder - SEEDess\nhttps://seedess.com/\n\n+1 (323) 454-3430\ngabe@fijiwebdesign.com\n",
    to: [
      {
        address: "mailsync2018@gmail.com",
        name: ""
      }
    ]
  },
  messageId:
    "CAOn17y=oVv1qAjQNsAbHMifk-_wYbEF46TFr0pD75y-jO_W2ng@mail.gmail.com",
  receivedDate: "2018-05-22T01:19:19.000Z",
  subject: "New mail test"
};
