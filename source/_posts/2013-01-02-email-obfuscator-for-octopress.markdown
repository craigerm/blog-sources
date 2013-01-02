---
layout: post
title: "Email Obfuscator for Octopress"
date: 2013-01-02 12:53
comments: true
categories: [octopress]
---

I want to include my email on my blog but I don't want to store it in plain text - for obvious reasons.
Originally I was going to use a third party script to do this since I couldn't find an Octopress
plugin that did what I was looking for. 

Instead I decided to write my first Octopress plugin.

The plugin allows the following tag in markdown for obfuscating emails:
```
{% raw %}{% email test@example.com %}{% endraw %}
```

This will render a script block that does the following:

 - Encodes the `@` and `.` characters
 - Encodes the `mailto:` prefix
 - Reverses the email and uses CSS to display it to the user

The output from the plugin looks something like:

```html
<script type="text/javascript">
document.write('<a style="unicode-bidi:bidi-override; direction: rtl;"href="&#109;&#97;&#105;&#108;&#116;&#111;&#58;test&#64;example&#46;com">moc&#46;elpmaxe&#64;tset</a>');
</script>
```

I'm currently using the plugin on this blog as of today. Hopefully this is of use to someone else too!

## Resources
* [Source code on GitHub](https://github.com/craigerm/email-obfuscate-octopress)
* [Nine ways to obfuscate an email](http://techblog.tilllate.com/2008/07/20/ten-methods-to-obfuscate-e-mail-addresses-compared/)
* [Superuser discussion on email obfuscation](http://superuser.com/questions/235937/does-e-mail-address-obfuscation-actually-work)

