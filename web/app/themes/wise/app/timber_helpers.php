
<?php

/**
 * This fuctions returns an array with menu items to include in the breadcrumbs
 */
function get_breadcrumb() {
	$context = Timber::get_context();
    $post = new Timber\Post();
    $items = $context['menu']->items;
	$crumbs = [];

    if ($items) {
        foreach ($items as $item) {
            if ($item->current_item_parent
            || $item->current_item_ancestor
            || ($item->current && get_post_type() !== 'page')) {
            $crumbs[] = $item;
            }
        }
    }

    // News part.
    if (is_single()) {
        if (get_post_type() == 'news') {
            // Breadcrumb for an article.
            $news = new Timber\Post();
            $news->post_title = 'Actualités';
            $news->url = get_post_type_archive_link('news');
            $crumbs[] = $news;
        }

        $page_for_posts = new Timber\Post();
        $page_for_posts->post_title = $post->title;
        $page_for_posts->current = true;
        $crumbs[] = $page_for_posts;
    }

    if (!is_single() && (is_tax('news_category')
        || (get_query_var('order') && get_post_type() == 'news'))
    ) {
        unset($crumbs);
        $page_for_posts = new Timber\Post();
        $page_for_posts->post_title = 'Actualités';
        $page_for_posts->current = true;
        $crumbs[] = $page_for_posts;
    }

    // Resource part.
    if ( !is_single() && get_query_var('resource_category')) {
        // Breadcrumb for resource.
        $resource = new Timber\Post();
        $resource->post_title = 'Ressources';
        $resource->url = get_post_type_archive_link('resource');
        $crumbs[] = $resource;

        // Breadcrumb for the resource category.
        $page_for_posts = new Timber\Post();
        $page_for_posts->post_title = get_query_var('resource_category');
        $page_for_posts->current = true;
        $crumbs[] = $page_for_posts;
    }

    // Page part.
    if (get_post_type() == 'page') {
        $page_for_posts = new Timber\Post();
        $page_for_posts->post_title = $post->title;
        $page_for_posts->current = true;
        $crumbs[] = $page_for_posts;
    }

	return $crumbs;
}
