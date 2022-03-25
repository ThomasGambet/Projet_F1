<?php
require '../../class/class.database.php';
$db = Database::getInstance();

$sql = <<<EOD
    Select grandprix.nom as nomgp, pilote.nom as nompilote, ecurie.nom as nomecurie, place, resultat.point, idgrandprix
	From resultat
        join grandprix on resultat.idgrandprix = grandprix.id
        join pilote on resultat.numeropilote = pilote.numero
        join ecurie on pilote.idecurie = ecurie.id
    Order by place;
EOD;
$curseur = $db->query($sql);
$lesLignes = $curseur->fetchAll(PDO::FETCH_ASSOC);
$curseur->closeCursor();
$lesDonnees['lesResultats'] = $lesLignes;

$sql = <<<EOD
    SELECT id, nom 
    FROM grandprix
    ORDER BY id;
EOD;
$curseur = $db->query($sql);
$lesLignes = $curseur->fetchAll(PDO::FETCH_ASSOC);
$curseur->closeCursor();
$lesDonnees['lesGrandprix'] = $lesLignes;

echo json_encode($lesDonnees);