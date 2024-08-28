

-- Source Table
CREATE TABLE SrcTable (
    Id INT PRIMARY KEY,
    Name NVARCHAR(100),
    Description NVARCHAR(255),
    recCreated DATETIME DEFAULT GETDATE()
);

-- Destination Table
CREATE TABLE DesTable (
    Id INT PRIMARY KEY,
    Name NVARCHAR(100),
    Description NVARCHAR(255),
    recCreated DATETIME DEFAULT GETDATE(),
    IsDeleted BIT DEFAULT 0 
);


INSERT INTO SrcTable (Id, Name, Description)
VALUES 
(1, 'Test1', 'Testdesc 1'),
(2, 'Test 2', 'Testdesc 2'),
(3, 'Test 3', 'Testdesc 3');


IF OBJECT_ID('dbo.SyncTables', 'P') IS NOT NULL
    DROP PROCEDURE dbo.SyncTables;
GO


CREATE PROCEDURE SyncTables
AS
BEGIN
   
    INSERT INTO DesTable (Id, Name, Description, recCreated)
    SELECT s.Id, s.Name, s.Description, s.recCreated
    FROM SrcTable s
    LEFT JOIN DesTable t ON s.Id = t.Id
    WHERE t.Id IS NULL;
    
   
    UPDATE t
    SET t.Name = s.Name,
        t.Description = s.Description,
        t.recCreated = GETDATE()
    FROM DesTable t
    INNER JOIN SrcTable s ON t.Id = s.Id
    WHERE t.Name <> s.Name OR t.Description <> s.Description;

    
    UPDATE t
    SET t.IsDeleted = 1
    FROM DesTable t
    LEFT JOIN SrcTable s ON t.Id = s.Id
    WHERE s.Id IS NULL AND t.IsDeleted = 0;
END;
GO



SELECT * FROM SrcTable;
SELECT * FROM DesTable;

EXEC SyncTables;

SELECT * FROM SrcTable;
SELECT * FROM DesTable;





UPDATE SrcTable
SET Name = 'Updated Test 1', Description = 'Updated Testdesc 1'
WHERE Id = 1;


DELETE FROM SrcTable
WHERE Id = 2;

SELECT * FROM SrcTable


EXEC SyncTables;
SELECT * FROM SrcTable;
SELECT * FROM DesTable;

