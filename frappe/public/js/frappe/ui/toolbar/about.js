frappe.provide('frappe.ui.misc');
frappe.ui.misc.about = function() {
	if(!frappe.ui.misc.about_dialog) {
		var d = new frappe.ui.Dialog({title: __('VlinkU')})

		$(d.body).html(repl("<div>\
		<p>"+__("")+"</p>  \
		<p><i class='icon-globe icon-fixed-width'></i>\
			 Website: <a href='http://www.vlinku.com/' target='_blank'>http://www.vlinku.com/</a></p>\
	 	<hr>\
		<h4>Installed Apps</h4>\
		<div id='about-app-versions'>Loading versions...</div>\
		<hr>\
		<p class='text-muted'>&copy; VlinkU Solutions Inc. </p> \
		</div>", frappe.app));

		frappe.ui.misc.about_dialog = d;

		frappe.ui.misc.about_dialog.on_page_show = function() {
			if(!frappe.versions) {
				frappe.call({
					method: "frappe.utils.change_log.get_versions",
					callback: function(r) {
						show_versions(r.message);
					}
				})
			}
		};

		var show_versions = function(versions) {
			var $wrap = $("#about-app-versions").empty();
			$.each(keys(versions).sort(), function(i, key) {
				var v = versions[key];
				$($.format('<p><b>{0}:</b> v{1}<br><span class="text-muted">{2}</span></p>',
						   [v.title, v.version, v.description])).appendTo($wrap);
			});

			frappe.versions = versions;
		}

	}

	frappe.ui.misc.about_dialog.show();

}
