<?php
namespace App\Controller;

use App\Exception\NotFoundException;
use App\Model\comment;
use App\Service\Router;
use App\Service\Templating;

class Discussion
{
    public function indexAction(Templating $templating, Router $router): ?string
    {
        $comments = Comment::findAll();
        $html = $templating->render('comment/index.html.php', [
            'comments' => $comments,
            'router' => $router,
        ]);
        return $html;
    }

    public function createAction(?array $requestData, Templating $templateEngine, Router $routeHandler): ?string
    {
        $comment = $requestData ? Comment::fromArray($requestData) : new Comment();

        if ($requestData) {

            $comment->save();

            $redirectTo = $routeHandler->generatePath('comment-index');
            $routeHandler->redirect($redirectTo);

            return null;
        }

        $htmlOutput = $templateEngine->render('comment/create.html.php', [
            'comment' => $comment,
            'router' => $routeHandler,
        ]);

        return $htmlOutput;
    }


    public function editAction(int $commentId, ?array $requestData, Templating $templateEngine, Router $routeHandler): ?string
    {
        $comment = Comment::find($commentId);

        if (!$comment) {
            throw new NotFoundException("Comment with id $commentId not found");
        }

        if ($requestData) {
            $comment->fill($requestData);
            $comment->save();

            $redirectTo = $routeHandler->generatePath('comment-index');
            $routeHandler->redirect($redirectTo);

            return null;
        }

        $htmlOutput = $templateEngine->render('comment/edit.html.php', [
            'comment' => $comment,
            'router' => $routeHandler,
        ]);

        return $htmlOutput;
    }


    public function showAction(int $commentId, Templating $templateEngine, Router $routeHandler): ?string
    {
        $comment = Comment::find($commentId);

        $htmlOutput = $templateEngine->render('comment/show.html.php', [
            'comment' => $comment,
            'router' => $routeHandler,
        ]);

        return $htmlOutput;
    }


    public function deleteAction(int $commentId, Router $router): ?string
    {
        $comment = Comment::find($commentId);
        if (! $comment) {
            throw new NotFoundException("Missing comment with id $commentId");
        }

        $comment->delete();
        $path = $router->generatePath('comment-index');
        $router->redirect($path);
        return null;
    }
}
